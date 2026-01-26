import { readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import readline from "node:readline/promises";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import rehypeParse from "rehype-parse";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import inlineCss from "inline-css";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import CleanCSS from "clean-css";
import { SITE_NAME } from "src/lib/site";

const BASE_REQUIRED_ENV = [
	"RESEND_API_KEY",
	"RESEND_FROM_EMAIL",
];

const usage = () => {
	console.log(
		"Usage: node scripts/send-newsletter.mjs [--slug=issue-0|--file=path] [--publish] [--confirm] [--force] [--prod]",
	);
};

const parseArgs = (argv) => {
	const args = argv.slice(2);
	const options = {
		input: "",
		publish: false,
		confirm: false,
		force: false,
		prod: false,
	};
	for (const arg of args) {
		if (arg === "--publish") {
			options.publish = true;
			continue;
		}
		if (arg === "--confirm") {
			options.confirm = true;
			continue;
		}
		if (arg === "--force") {
			options.force = true;
			continue;
		}
		if (arg === "--prod") {
			options.prod = true;
			continue;
		}
		if (arg.startsWith("--slug=")) {
			options.input = arg.split("=").slice(1).join("=");
			continue;
		}
		if (arg.startsWith("--file=")) {
			options.input = arg.split("=").slice(1).join("=");
			continue;
		}
		if (!options.input && !arg.startsWith("--")) {
			options.input = arg;
		}
	}
	return options;
};

const getAudienceId = (isProd) =>
	isProd ? process.env.RESEND_AUDIENCE_ID_PROD : process.env.RESEND_AUDIENCE_ID;

const ensureEnv = (isProd) => {
	const missing = BASE_REQUIRED_ENV.filter((key) => !process.env[key]);
	const audienceEnvKey = isProd
		? "RESEND_AUDIENCE_ID_PROD"
		: "RESEND_AUDIENCE_ID";
	if (!getAudienceId(isProd)) {
		missing.push(audienceEnvKey);
	}
	if (missing.length) {
		throw new Error(`Missing env vars: ${missing.join(", ")}`);
	}
	if (!process.env.NEWSLETTER_SITE_URL && !process.env.SITE_URL) {
		throw new Error("Missing env var: NEWSLETTER_SITE_URL or SITE_URL");
	}
};

const resolveNewsletterPath = (input) => {
	if (!input) return "";
	if (input.endsWith(".mdx") || input.endsWith(".md")) {
		return path.resolve(process.cwd(), input);
	}
	return path.resolve(
		process.cwd(),
		"src",
		"content",
		"newsletter",
		`${input}.mdx`,
	);
};

const parseFrontmatter = (contents) => {
	const match = contents.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) {
		throw new Error("Missing frontmatter block");
	}
	const raw = match[1];
	const lines = raw.split("\n");
	const data = {};
	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		const entry = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!entry) continue;
		const key = entry[1];
		let value = entry[2].trim();
		if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}
		if (value === "true" || value === "false") {
			data[key] = value === "true";
		} else {
			data[key] = value;
		}
	}
	return {
		data,
		frontmatterRaw: match[0],
		frontmatterBody: raw,
		body: contents.slice(match[0].length),
	};
};

const slugifyTag = (value) =>
	String(value)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

const parseTagValue = (value) => {
	if (!value) return [];
	const trimmed = value.trim();
	if (!trimmed) return [];
	if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
		return trimmed
			.slice(1, -1)
			.split(",")
			.map((entry) => entry.trim())
			.filter(Boolean)
			.map((entry) => entry.replace(/^["']|["']$/g, ""));
	}
	return [trimmed.replace(/^["']|["']$/g, "")];
};

const parseFrontmatterTags = (frontmatterBody) => {
	if (!frontmatterBody) return [];
	const blockMatch = frontmatterBody.match(
		/^tags:\s*\n((?:[ \t]*-\s*.+\n)+)/m,
	);
	if (blockMatch?.[1]) {
		return blockMatch[1]
			.split("\n")
			.map((line) => line.match(/-\s*(.+)$/)?.[1]?.trim())
			.filter(Boolean)
			.map((entry) => entry.replace(/^["']|["']$/g, ""));
	}
	const inlineMatch = frontmatterBody.match(/^tags:\s*(.+)$/m);
	return inlineMatch?.[1] ? parseTagValue(inlineMatch[1]) : [];
};

const formatYamlValue = (value) => {
	if (typeof value === "boolean") return value ? "true" : "false";
	if (typeof value === "number") return String(value);
	const stringValue = String(value);
	if (/[:#\n\r\t]/.test(stringValue) || stringValue.includes(" ")) {
		return `"${stringValue.replace(/\"/g, "\\\"")}"`;
	}
	return stringValue;
};

const updateFrontmatter = (contents, updates) => {
	const match = contents.match(/^---\n([\s\S]*?)\n---\n?/);
	if (!match) {
		throw new Error("Missing frontmatter block");
	}
	const lines = match[1].split("\n");
	const seen = new Set();
	const updatedLines = lines.map((line) => {
		const entry = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!entry) return line;
		const key = entry[1];
		if (!(key in updates)) return line;
		seen.add(key);
		return `${key}: ${formatYamlValue(updates[key])}`;
	});
	for (const [key, value] of Object.entries(updates)) {
		if (seen.has(key)) continue;
		updatedLines.push(`${key}: ${formatYamlValue(value)}`);
	}
	const updatedFrontmatter = `---\n${updatedLines.join("\n")}\n---\n`;
	return updatedFrontmatter + contents.slice(match[0].length);
};

const buildEmailSchema = () => {
	const schema = { ...defaultSchema };
	const tagNames = new Set([
		...(schema.tagNames ?? []),
		"html",
		"head",
		"body",
		"title",
		"meta",
		"article",
		"header",
		"section",
		"main",
		"footer",
		"div",
		"span",
		"table",
		"thead",
		"tbody",
		"tr",
		"td",
		"th",
		"img",
		"hr",
	]);
	schema.tagNames = Array.from(tagNames);
	const attributes = { ...(schema.attributes ?? {}) };
	const globalAttrs = new Set(attributes["*"] ?? []);
	globalAttrs.add("style");
	attributes["*"] = Array.from(globalAttrs);
	attributes.meta = Array.from(new Set([...(attributes.meta ?? []), "charset", "content", "name"]));
	attributes.a = Array.from(new Set([...(attributes.a ?? []), "href", "title", "target", "rel"]));
	attributes.img = Array.from(
		new Set([...(attributes.img ?? []), "src", "alt", "width", "height"]),
	);
	schema.attributes = attributes;
	return schema;
};

const renderMdxBody = async (body) => {
	const result = await unified()
		.use(remarkParse)
		.use(remarkMdx)
		.use(remarkGfm)
		.use(remarkMath)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeKatex)
		.use(rehypeStringify, { allowDangerousHtml: true })
		.process(body);
	return String(result);
};

const loadCssFile = async (filePath, seen = new Set()) => {
	const resolvedPath = path.resolve(filePath);
	if (seen.has(resolvedPath)) return "";
	seen.add(resolvedPath);
	const css = await readFile(resolvedPath, "utf8");
	const baseDir = path.dirname(resolvedPath);
	const importRegex = /@import\s+(?:url\()?["']([^"']+)["']\)?\s*;?/g;
	let result = "";
	let lastIndex = 0;
	for (const match of css.matchAll(importRegex)) {
		const [raw, importPath] = match;
		const startIndex = match.index ?? 0;
		result += css.slice(lastIndex, startIndex);
		lastIndex = startIndex + raw.length;
		if (importPath.startsWith(".")) {
			const nested = await loadCssFile(path.join(baseDir, importPath), seen);
			result += nested;
		}
	}
	result += css.slice(lastIndex);
	return result;
};

const minifyCss = (css) => new CleanCSS({ level: 2 }).minify(css).styles;

const loadEmailCss = async () => {
	const stylesDir = path.join(process.cwd(), "src", "styles");
	const typographyCss = await loadCssFile(path.join(stylesDir, "typography.css"));
	const emailCss = await loadCssFile(path.join(stylesDir, "email.css"));
	return minifyCss(`${typographyCss}\n${emailCss}`);
};

const buildEmailTemplate = ({
	title,
	description,
	issueNumber,
	dateLabel,
	bodyHtml,
	issueUrl,
	siteUrl,
	tags,
	css,
}) => {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>${css}</style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-card">
        <p class="email-eyebrow">Newsletter</p>
        <h1>${title}</h1>
		<h2>
			${Number.isInteger(issueNumber) ? `<span>Issue ${issueNumber}</span>` : ""}
		</h2>
		<div class="email-meta">
            ${dateLabel ? `<span class="email-date">${dateLabel}</span>` : ""}
		</div>
        ${description ? `<p class="email-lede">${description}</p>` : ""}
        <div class="email-meta">
          ${issueUrl ? `<span><a class="email-link" href="${issueUrl}">Read in browser</a></span>` : ""}
        </div>
        ${tags?.length
			? `<div class="email-tags">${tags
				.map(
					(tag) =>
						`<a class="email-tag" href="${tag.url}">#${tag.label}</a>`,
				)
				.join("")}</div>`
			: ""
		}
        <div class="email-body">
          ${bodyHtml}
        </div>
        <div class="email-footer">
          <p style="box-sizing: border-box;">This email is sent with a one-click unsubscribe to manage your subscription within your email client.</p>
          ${siteUrl ? `<p>You may also directly manage your subscription: <a href="${siteUrl}/unsubscribe">${siteUrl}/unsubscribe</a></p>` : ""}
        </div>
      </div>
    </div>
  </body>
</html>`;
};

const inlineEmailCss = async (html) => {
	return inlineCss(html, {
		url: `file://${process.cwd()}/`,
		applyStyleTags: true,
		removeStyleTags: true,
		removeLinkTags: true,
		preserveMediaQueries: false,
	});
};

const sanitizeEmailHtml = async (html) => {
	const inlined = await inlineEmailCss(html);
	const sanitized = await unified()
		.use(rehypeParse, { fragment: false })
		.use(rehypeSanitize, buildEmailSchema())
		.use(rehypeStringify)
		.process(inlined);
	return String(sanitized);
};

const rewriteRelativeUrls = (html, baseUrl) => {
	const base = baseUrl.replace(/\/$/, "");
	return html.replace(
		/(href|src)=["'](\/[^"']*)["']/g,
		(_, attr, url) => `${attr}="${base}${url}"`,
	);
};

const formatEmailDate = (value) => {
	if (!value) return "";
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return new Intl.DateTimeFormat("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(date);
};

const sendBroadcast = async ({ name, subject, html, text, audienceId }) => {
	const response = await fetch("https://api.resend.com/broadcasts", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			audience_id: audienceId,
			from: process.env.RESEND_FROM_NAME
				? `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`
				: process.env.RESEND_FROM_EMAIL,
			name,
			subject,
			html,
			text,
		}),
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Resend broadcast failed: ${response.status} ${body}`);
	}
	const created = await response.json();
	const broadcastId = created?.id;
	if (!broadcastId) {
		throw new Error("Resend broadcast failed: missing broadcast id");
	}

	const sendResponse = await fetch(
		`https://api.resend.com/broadcasts/${broadcastId}/send`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
		},
	);
	if (!sendResponse.ok) {
		const body = await sendResponse.text();
		throw new Error(`Resend broadcast send failed: ${sendResponse.status} ${body}`);
	}
	return { id: broadcastId };
};

const fetchBroadcastStatus = async (broadcastId) => {
	const response = await fetch(
		`https://api.resend.com/broadcasts/${broadcastId}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
			},
		},
	);
	if (!response.ok) {
		const body = await response.text();
		throw new Error(
			`Resend broadcast status failed: ${response.status} ${body}`,
		);
	}
	return response.json();
};

const confirmBroadcastStatus = async (broadcastId) => {
	const retries = 3;
	for (let attempt = 1; attempt <= retries; attempt += 1) {
		if (attempt > 1) {
			await new Promise((resolve) => setTimeout(resolve, 2000));
		} else {
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}
		try {
			const status = await fetchBroadcastStatus(broadcastId);
			console.log(`Broadcast status: ${status?.status ?? "unknown"}`);
			return status;
		} catch (error) {
			if (attempt === retries) throw error;
		}
	}
	return null;
};

const confirmPublish = async () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	try {
		const answer = await rl.question(
			"Are you sure you want to send this email (y/N) ",
		);
		return answer.trim().toLowerCase() === "y";
	} finally {
		rl.close();
	}
};

const main = async () => {
	const { input, publish, confirm, force, prod } = parseArgs(process.argv);
	if (!input) {
		usage();
		process.exit(1);
	}

	ensureEnv(prod);
	const audienceId = getAudienceId(prod);

	const filePath = resolveNewsletterPath(input);
	const contents = await readFile(filePath, "utf8");
	const { data, body, frontmatterBody } = parseFrontmatter(contents);

	if (data.draft === true) {
		throw new Error("Newsletter is marked as draft.");
	}
	if (!force && (data.sent === true || data.sentAt)) {
		console.log("Newsletter already marked as sent. Use --force to resend.");
		return;
	}

	const slug = input.endsWith(".mdx") || input.endsWith(".md")
		? path.basename(input, path.extname(input))
		: input;
	const siteUrl = (process.env.NEWSLETTER_SITE_URL || process.env.SITE_URL).replace(
		/\/$/,
		"",
	);
	const rawTags = parseFrontmatterTags(frontmatterBody);
	const tags = rawTags
		.map((tag) => {
			const slug = slugifyTag(tag);
			return slug ? { label: tag, url: `${siteUrl}/tags/${slug}/` } : null;
		})
		.filter(Boolean);
	const issueUrl = `${siteUrl}/newsletter/${slug}/`;
	const bodyHtml = await renderMdxBody(body);
	const css = await loadEmailCss();
	const parsedIssueNumber =
		typeof data.issueNumber === "number"
			? data.issueNumber
			: typeof data.issueNumber === "string" && data.issueNumber.trim() !== ""
				? Number(data.issueNumber)
				: null;
	const emailTitle = String(
		data.title || `Newsletter from ${process.env.SUBSCRIBE_SITE_NAME || SITE_NAME}`,
	);
	const rawHtml = buildEmailTemplate({
		title: emailTitle,
		description: typeof data.description === "string" ? data.description : "",
		issueNumber: Number.isFinite(parsedIssueNumber) ? parsedIssueNumber : null,
		dateLabel: formatEmailDate(data.pubDate),
		bodyHtml,
		issueUrl,
		siteUrl,
		tags,
		css,
	});
	const html = await sanitizeEmailHtml(rewriteRelativeUrls(rawHtml, siteUrl));
	const subject = typeof data.title === "string" && data.title.trim()
		? data.title.trim()
		: `Newsletter from ${process.env.SUBSCRIBE_SITE_NAME || SITE_NAME}`;
	const text = `${subject}\n\nRead online: ${issueUrl}\n\nUnsubscribe: ${siteUrl ? `${siteUrl}/unsubscribe` : "Manage your subscription via the unsubscribe link in your email client."}`;
	const name = Number.isFinite(parsedIssueNumber)
		? `Issue ${parsedIssueNumber} - ${subject}`
		: subject;

	console.log("Newsletter metadata:");
	console.log(`- slug: ${slug}`);
	console.log(`- title: ${emailTitle}`);
	console.log(`- subject: ${subject}`);
	console.log(`- broadcast name: ${name}`);
	console.log(`- issue number: ${Number.isFinite(parsedIssueNumber) ? parsedIssueNumber : "n/a"}`);
	console.log(`- issue url: ${issueUrl}`);
	console.log(`- publish date: ${formatEmailDate(data.pubDate) || "n/a"}`);
	console.log(`- publish: ${publish ? "yes" : "no"}`);

	if (!publish) {
		console.log("Dry run (default): skipping send. Use --publish to send.");
		console.log(`Subject: ${subject}`);
		console.log(`URL: ${issueUrl}`);
		const tempPath = path.join(
			os.tmpdir(),
			`newsletter-${slug}-${Date.now()}.html`,
		);
		await writeFile(tempPath, html, "utf8");
		console.log(`Saved HTML preview to ${tempPath}`);
		return;
	}

	const confirmed = await confirmPublish();
	if (!confirmed) {
		console.log("Publish cancelled.");
		return;
	}

	const result = await sendBroadcast({ name, subject, html, text, audienceId });
	console.log(`Sent broadcast ${result?.id ?? ""}`.trim());

	const updated = updateFrontmatter(contents, {
		broadcast_id: result?.id ?? null,
		sent: true,
		sentAt: new Date().toISOString(),
	});
	await writeFile(filePath, updated, "utf8");
	console.log("Frontmatter updated with sent status.");

	if (confirm && result?.id) {
		await confirmBroadcastStatus(result.id);
	} else if (confirm) {
		console.log("Broadcast id missing; skipping confirm check.");
	}
};

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
