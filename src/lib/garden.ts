import fs from "node:fs";
import path from "node:path";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import {
	createMarkdownProcessor,
	parseFrontmatter,
} from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { RehypePlugin } from "@astrojs/markdown-remark";
import remarkObsidianLinks, {
	slugifyHeading,
	slugifyObsidianTarget,
} from "../../plugins/remark-obsidian-links.js";
import {
	isGardenPublished,
	isIgnoredDirName,
	isIgnoredFileName,
} from "./obsidian-utils.js";
import {
	loadObsidianConfig,
	normalizeVaultPath,
	resolveGardenRoot,
} from "./obsidianConfig";
import { normalizeTags, parseDate } from "./frontmatter";

export interface GardenNote {
	slug: string;
	title: string;
	content: string;
	updatedAt: Date;
	relativePath: string;
	published: boolean;
	tags: string[];
	date?: Date;
}

/** Read every note in the garden root, sorted by title (published only by default). */
export const loadGardenNotes = async (
	options: { includeUnpublished?: boolean } = {},
) => {
	const vaultRoot = resolveGardenRoot();
	if (!vaultRoot) return [] as GardenNote[];
	// Commonplace notes live in the same vault but are not garden notes.
	const commonplaceRoot = normalizeVaultPath(
		loadObsidianConfig().commonplacePath,
	);
	const isCommonplace = (relativePath: string) =>
		relativePath === commonplaceRoot ||
		relativePath.startsWith(`${commonplaceRoot}/`);

	const notes: GardenNote[] = [];
	const visitDir = (dir: string) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (!isIgnoredDirName(entry.name)) visitDir(fullPath);
				continue;
			}
			if (!entry.isFile() || !/\.md$/i.test(entry.name)) continue;
			if (isIgnoredFileName(entry.name)) continue;
			const relativePath = normalizeVaultPath(
				path.relative(vaultRoot, fullPath),
			);
			if (isCommonplace(relativePath)) continue;
			let parsed: ReturnType<typeof parseFrontmatter>;
			try {
				parsed = parseFrontmatter(fs.readFileSync(fullPath, "utf8"), {
					frontmatter: "remove",
				});
			} catch (error) {
				console.warn(
					`[obsidian] Skipping note with invalid frontmatter at ${fullPath}: ${
						error instanceof Error ? error.message : String(error)
					}`,
				);
				continue;
			}
			const frontmatter = parsed.frontmatter as Record<string, unknown>;
			notes.push({
				slug: slugifyObsidianTarget(relativePath),
				title:
					(typeof frontmatter.title === "string" && frontmatter.title) ||
					entry.name.replace(/\.md$/i, ""),
				content: parsed.content,
				updatedAt: fs.statSync(fullPath).mtime,
				relativePath,
				published: isGardenPublished(frontmatter),
				tags: normalizeTags(frontmatter.tags),
				date: parseDate(frontmatter.date),
			});
		}
	};

	visitDir(vaultRoot);
	notes.sort((a, b) => a.title.localeCompare(b.title));
	return options.includeUnpublished
		? notes
		: notes.filter((note) => note.published);
};

const normalizeTarget = (value: string) =>
	slugifyObsidianTarget(value).toLowerCase();

/**
 * Resolve a wikilink/markdown-link target to a note by relative path, file
 * name, or title. Unknown and unpublished targets render as plain text.
 */
export const createGardenLinkResolver = (notes: GardenNote[]) => {
	const targetToNote = new Map<string, GardenNote>();
	for (const note of notes) {
		targetToNote.set(normalizeTarget(note.relativePath), note);
		targetToNote.set(normalizeTarget(path.basename(note.relativePath)), note);
		targetToNote.set(normalizeTarget(note.title), note);
	}

	return (link: {
		target: string;
		alias?: string;
	}): { text: string; isLink: boolean; slug?: string } => {
		const match = targetToNote.get(normalizeTarget(link.target));
		const text = link.alias || match?.title || link.target;
		if (!match?.published) return { text, isLink: false };
		return { slug: match.slug, text, isLink: true };
	};
};

type HeadingNode = Node & {
	value?: unknown;
	children?: HeadingNode[];
	data?: { hProperties?: Record<string, unknown> };
};

const collectText = (node: HeadingNode): string => {
	if (typeof node.value === "string") return node.value;
	return (node.children ?? []).map(collectText).join(" ");
};

// Give headings the same ids that `[[Note#Heading]]` links point at.
const headingIdPlugin = () => (tree: unknown) => {
	visit(tree as Node, "heading", (node: HeadingNode) => {
		const id = slugifyHeading(collectText(node).trim());
		if (!id) return;
		node.data = node.data || {};
		node.data.hProperties = { ...node.data.hProperties, id };
	});
};

// Same pipeline as astro.config.mjs `markdown`, plus wikilink resolution.
// Astro's built-in Prism is off: rehype-prism-plus highlights and numbers lines.
export const renderGardenMarkdown = async (
	content: string,
	resolveLink: ReturnType<typeof createGardenLinkResolver>,
) => {
	const processor = await createMarkdownProcessor({
		syntaxHighlight: false,
		remarkPlugins: [
			remarkMath,
			[remarkObsidianLinks, { resolveLink }],
			headingIdPlugin,
		],
		rehypePlugins: [
			rehypeKatex,
			[
				rehypePrism as unknown as RehypePlugin,
				{ showLineNumbers: true, defaultLanguage: "plaintext" },
			],
		],
	});

	const { code, metadata } = await processor.render(content);
	return { html: code, headings: metadata.headings };
};
