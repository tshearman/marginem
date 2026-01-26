import fs from "node:fs";
import path from "node:path";
import remarkGfm from "remark-gfm";
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

export { resolveGardenRoot as resolveVaultRoot };

const prismPlugin: [RehypePlugin, { showLineNumbers: true }] = [
	rehypePrism as unknown as RehypePlugin,
	{ showLineNumbers: true },
];

export interface GardenNote {
	slug: string;
	title: string;
	content: string;
	updatedAt: Date;
	sourcePath: string;
	relativePath: string;
	published: boolean;
	tags: string[];
	date?: Date;
}

const isMarkdownFile = (fileName: string) => /\.md$/i.test(fileName);

const extractTitle = (_content: string, fallback: string) =>
	fallback.replace(/\.md$/i, "");

const normalizePath = (value: string) => value.split(path.sep).join("/");

const normalizeTags = (value: unknown): string[] => {
	if (Array.isArray(value)) {
		return value.filter((item): item is string => typeof item === "string");
	}
	if (typeof value === "string") return [value];
	return [];
};

const parseDate = (value: unknown): Date | undefined => {
	if (!value) return undefined;
	const date = new Date(String(value));
	return Number.isNaN(date.getTime()) ? undefined : date;
};

export const loadGardenNotes = async (
	options: { includeUnpublished?: boolean } = {},
) => {
	const vaultRoot = resolveGardenRoot();
	if (!vaultRoot) return [] as GardenNote[];
	const config = loadObsidianConfig();
	const ignoredRoots = [config.commonplacePath]
		.filter(Boolean)
		.map((entry) => normalizeVaultPath(entry));
	const isIgnoredPath = (relativePath: string) =>
		ignoredRoots.some(
			(root) => relativePath === root || relativePath.startsWith(`${root}/`),
		);

	const notes: GardenNote[] = [];
	const visitDir = (dir: string) => {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (!isIgnoredDirName(entry.name)) {
					visitDir(fullPath);
				}
				continue;
			}
			if (!entry.isFile() || !isMarkdownFile(entry.name)) continue;
			if (isIgnoredFileName(entry.name)) {
				continue;
			}
			const rawContent = fs.readFileSync(fullPath, "utf8");
			let frontmatter: Record<string, unknown> = {};
			let content = rawContent;
			try {
				const parsed = parseFrontmatter(rawContent, { frontmatter: "remove" });
				frontmatter = (parsed.frontmatter ?? {}) as Record<string, unknown>;
				content = parsed.content ?? rawContent;
			} catch (error) {
				console.warn(
					`[obsidian] Skipping note with invalid frontmatter at ${fullPath}: ${
						error instanceof Error ? error.message : String(error)
					}`,
				);
				continue;
			}
			const relativePath = normalizePath(path.relative(vaultRoot, fullPath));
			if (isIgnoredPath(relativePath)) continue;
			const slug = slugifyObsidianTarget(relativePath);
			const stats = fs.statSync(fullPath);
			const published = isGardenPublished(frontmatter);
			const tags = normalizeTags(frontmatter?.tags);
			const date = parseDate(frontmatter?.date);
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
				tags,
				date,
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

type HeadingNode = Node & {
	value?: unknown;
	children?: HeadingNode[];
	data?: {
		hProperties?: Record<string, unknown>;
	};
};

const headingIdPlugin = () => (tree: unknown) => {
	visit(tree as Node, "heading", (node: Node) => {
		const collectText = (child: HeadingNode): string => {
			if (!child) return "";
			if (typeof child.value === "string") return child.value;
			if (Array.isArray(child.children)) {
				return child.children.map(collectText).join(" ");
			}
			return "";
		};

		const text = collectText(node as HeadingNode).trim();
		const id = slugifyHeading(text);
		if (!id) return;
		const typedNode = node as HeadingNode;
		typedNode.data = typedNode.data || {};
		typedNode.data.hProperties = {
			...(typedNode.data.hProperties || {}),
			id,
		};
	});
};

export const renderGardenMarkdown = async (
	content: string,
	resolveLink: (link: {
		target: string;
		alias?: string;
		heading?: string;
		isEmbed?: boolean;
	}) =>
		| string
		| {
				text: string;
				isLink: boolean;
				slug?: string;
				url?: string;
		  },
) => {
	const processor = await createMarkdownProcessor({
		syntaxHighlight: "prism",
		remarkPlugins: [
			remarkMath,
			remarkGfm,
			[remarkObsidianLinks, { resolveLink, linkPrefix: "/garden" }],
			headingIdPlugin,
		],
		rehypePlugins: [rehypeKatex, prismPlugin],
	});

	const { code, metadata } = await processor.render(content);
	return { html: code, headings: metadata.headings };
};
