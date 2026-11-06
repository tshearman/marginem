import fs from "node:fs";
import path from "node:path";
import { parseFrontmatter } from "@astrojs/markdown-remark";
import { loadObsidianConfig, resolveLocalVaultRoot } from "./obsidianConfig";
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
};

/** "Author — Source" attribution line for a commonplace note. */
export const formatAttribution = (note: {
	author?: string;
	source?: string;
}): string => [note.author, note.source].filter(Boolean).join(" — ");

const optionalString = (value: unknown) =>
	typeof value === "string" ? value : undefined;

/** Read every commonplace note from the live vault, or from content/commonplace. */
export const loadCommonplaceNotes = async () => {
	const localVault = resolveLocalVaultRoot();
	const commonplaceRoot = localVault
		? path.resolve(localVault, loadObsidianConfig().commonplacePath)
		: path.resolve(CONTENT_DIR, "commonplace");

	if (!fs.existsSync(commonplaceRoot)) return [] as CommonplaceNote[];

	const notes: CommonplaceNote[] = [];
	const ingestFile = (fullPath: string) => {
		if (!/\.md$/i.test(fullPath)) return;
		const { frontmatter, content } = parseFrontmatter(
			fs.readFileSync(fullPath, "utf8"),
			{ frontmatter: "remove" },
		);
		if (frontmatter.published === false) return;
		const stat = fs.statSync(fullPath);
		notes.push({
			content: content.trim(),
			source: optionalString(frontmatter.source),
			author: optionalString(frontmatter.author),
			tags: normalizeTags(frontmatter.tags),
			date: parseDate(frontmatter.date),
			// Birthtime is 0 on filesystems that don't track it (e.g. ext4).
			addedAt: stat.birthtime.getTime() > 0 ? stat.birthtime : stat.mtime,
		});
	};

	const visitDir = (dir: string) => {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
					visitDir(fullPath);
				}
			} else if (entry.isFile()) {
				ingestFile(fullPath);
			}
		}
	};

	if (fs.statSync(commonplaceRoot).isFile()) ingestFile(commonplaceRoot);
	else visitDir(commonplaceRoot);
	return notes;
};
