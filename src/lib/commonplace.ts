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
import { normalizeTags, parseDate } from "./frontmatter";

export type CommonplaceNote = {
	content: string;
	source?: string;
	author?: string;
	tags: string[];
	/** Date attributed to the quote (from frontmatter). */
	date?: Date;
	/** When the note was added to the site — file birthtime, falling back to
	 *  mtime on filesystems that don't track birth dates. Used as the
	 *  "added to commonplace" ordering signal. */
	addedAt: Date;
	sourcePath: string;
	relativePath: string;
};

/** "Author — Source" attribution line for a commonplace note. */
export const formatAttribution = (note: {
	author?: string;
	source?: string;
}): string => [note.author, note.source].filter(Boolean).join(" — ");

const isMarkdownFile = (fileName: string) => /\.md$/i.test(fileName);

const shouldSkipDir = (dirName: string) =>
	dirName.startsWith(".") || dirName === "node_modules";

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
		const stat = fs.statSync(fullPath);
		// Birthtime is 0 on filesystems that don't track it (e.g. ext4) — fall
		// back to mtime so the field is always meaningful.
		const addedAt =
			stat.birthtime.getTime() > 0 ? stat.birthtime : stat.mtime;
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
			addedAt,
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
