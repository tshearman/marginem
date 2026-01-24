import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "@astrojs/markdown-remark";
import {
	loadObsidianConfig,
	normalizeVaultPath,
	resolveLocalVaultRoot,
	resolveVaultSubpath,
} from "./obsidianConfig";
import { CONTENT_DIR } from "./site";

export type CommonplaceNote = {
	content: string;
	source?: string;
	author?: string;
	tags: string[];
	date?: Date;
	sourcePath: string;
	relativePath: string;
};

const isMarkdownFile = (fileName: string) => /\.md$/i.test(fileName);

const shouldSkipDir = (dirName: string) =>
	dirName.startsWith(".") || dirName === "node_modules";

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

export const loadCommonplaceNotes = async () => {
	const config = loadObsidianConfig();
	const localVault = resolveLocalVaultRoot();
	const syncedCommonplaceRoot = path.resolve(
		process.cwd(),
		CONTENT_DIR,
		"commonplace",
	);
	const sampleCommonplaceRoot = path.resolve(
		process.cwd(),
		"data/obsidian-vault-sample/commonplace",
	);
	const commonplaceRoot = localVault
		? resolveVaultSubpath(
				localVault,
				normalizeVaultPath(config.commonplacePath),
			)
		: fs.existsSync(syncedCommonplaceRoot)
			? syncedCommonplaceRoot
			: sampleCommonplaceRoot;

	if (!fs.existsSync(commonplaceRoot)) return [] as CommonplaceNote[];

	const notes: CommonplaceNote[] = [];
	const ingestFile = (fullPath: string) => {
		if (!isMarkdownFile(fullPath)) return;
		const rawContent = fs.readFileSync(fullPath, "utf8");
		const { frontmatter, content } = parseFrontmatter(rawContent, {
			frontmatter: "remove",
		});
		if (frontmatter?.published === false) return;
		const relativePath = localVault
			? path.relative(localVault, fullPath)
			: path.relative(syncedCommonplaceRoot, fullPath);
		notes.push({
			content: content.trim(),
			source:
				typeof frontmatter?.source === "string"
					? frontmatter.source
					: undefined,
			author:
				typeof frontmatter?.author === "string"
					? frontmatter.author
					: undefined,
			tags: normalizeTags(frontmatter?.tags),
			date: parseDate(frontmatter?.date),
			sourcePath: fullPath,
			relativePath,
		});
	};

	const stats = fs.statSync(commonplaceRoot);
	if (stats.isFile()) {
		ingestFile(commonplaceRoot);
		return notes;
	}

	const visitDir = (dir: string) => {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (!shouldSkipDir(entry.name)) visitDir(fullPath);
				continue;
			}
			if (!entry.isFile()) continue;
			ingestFile(fullPath);
		}
	};

	visitDir(commonplaceRoot);
	return notes;
};
