import fs from "node:fs";
import path from "node:path";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import { createMarkdownProcessor, parseFrontmatter } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import remarkObsidianLinks, {
	slugifyHeading,
	slugifyObsidianTarget,
} from "../../plugins/remark-obsidian-links.js";

export interface GardenNote {
	slug: string;
	title: string;
	content: string;
	updatedAt: Date;
	sourcePath: string;
	relativePath: string;
	published: boolean;
}

const isMarkdownFile = (fileName: string) => /\.md$/i.test(fileName);

const shouldSkipDir = (dirName: string) =>
	dirName.startsWith(".") || dirName === "node_modules";

const extractTitle = (content: string, fallback: string) => {
	const headingMatch = content.match(/^#\s+(.+?)\s*$/m);
	if (headingMatch?.[1]) {
		return headingMatch[1].trim();
	}
	return fallback.replace(/\.md$/i, "");
};

const getSampleVaultPath = () =>
	path.resolve(process.cwd(), "data/obsidian-vault-sample");

export const resolveVaultRoot = () => {
	const vaultEnv = process.env.OBSIDIAN_VAULT;
	const candidates = [];
	if (vaultEnv) {
		candidates.push(path.resolve(process.cwd(), vaultEnv));
	}
	// Fallback to the bundled sample vault so the Garden page always works locally.
	candidates.push(getSampleVaultPath());

	for (const candidate of candidates) {
		if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
			return candidate;
		}
	}

	if (vaultEnv) {
		console.warn(
			`[garden] OBSIDIAN_VAULT path "${path.resolve(process.cwd(), vaultEnv)}" does not exist or is not a directory.`,
		);
	}
	return null;
};

const normalizePath = (value: string) => value.split(path.sep).join("/");

export const loadGardenNotes = async (options: { includeUnpublished?: boolean } = {}) => {
	const vaultRoot = resolveVaultRoot();
	if (!vaultRoot) return [] as GardenNote[];

	const notes: GardenNote[] = [];
	const visitDir = (dir: string) => {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (!shouldSkipDir(entry.name)) {
					visitDir(fullPath);
				}
				continue;
			}
			if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
			const rawContent = fs.readFileSync(fullPath, "utf8");
			const { frontmatter, content } = parseFrontmatter(rawContent, {
				frontmatter: "remove",
			});
			const relativePath = normalizePath(path.relative(vaultRoot, fullPath));
			const slug = slugifyObsidianTarget(relativePath);
			const stats = fs.statSync(fullPath);
			const published = frontmatter?.published === true;
			notes.push({
				slug,
				title:
					(typeof frontmatter?.title === "string" && frontmatter.title) ||
					extractTitle(content, entry.name),
				content,
				updatedAt: stats.mtime,
				sourcePath: fullPath,
				relativePath,
				published,
			});
		}
	};

	visitDir(vaultRoot);
	const sorted = notes.sort((a, b) => a.title.localeCompare(b.title));
	if (options.includeUnpublished) return sorted;
	return sorted.filter((note) => note.published);
};

const normalizeTarget = (value: string) =>
	slugifyObsidianTarget(value).toLowerCase();

export const createGardenLinkResolver = (notes: GardenNote[]) => {
	const targetToNote = new Map<string, GardenNote>();

	for (const note of notes) {
		targetToNote.set(normalizeTarget(note.relativePath), note);
		targetToNote.set(normalizeTarget(path.basename(note.relativePath)), note);
		targetToNote.set(normalizeTarget(note.title), note);
	}

	return (link: { target: string; alias?: string }) => {
		const match = targetToNote.get(normalizeTarget(link.target));
		const displayText = link.alias || match?.title || link.target;

		if (!match) {
			return { text: displayText, isLink: false };
		}

		if (!match.published) {
			return { text: displayText, isLink: false };
		}

		return { slug: match.slug, text: displayText, isLink: true };
	};
};

const headingIdPlugin = () => (tree: unknown) => {
	visit(tree as any, "heading", (node: any) => {
		const collectText = (child: any): string => {
			if (!child) return "";
			if (typeof child.value === "string") return child.value;
			if (Array.isArray(child.children)) {
				return child.children.map(collectText).join(" ");
			}
			return "";
		};

		const text = collectText(node).trim();
		const id = slugifyHeading(text);
		if (!id) return;
		node.data = node.data || {};
		node.data.hProperties = {
			...(node.data.hProperties || {}),
			id,
		};
	});
};

export const renderGardenMarkdown = async (
	content: string,
	resolveLink: (link: { target: string }) => string,
) => {
	const processor = await createMarkdownProcessor({
		syntaxHighlight: "prism",
		remarkPlugins: [
			remarkMath,
			remarkGfm,
			[remarkObsidianLinks, { resolveLink, linkPrefix: "/garden" }],
			headingIdPlugin,
		],
		rehypePlugins: [rehypeKatex, [rehypePrism, { showLineNumbers: true }]],
	});

	const { code, metadata } = await processor.render(content);
	return { html: code, headings: metadata.headings };
};
