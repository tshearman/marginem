import { getCollection } from "astro:content";
import { MAIN_PAGES } from "./site";
import { formatAttribution, loadCommonplaceNotes } from "./commonplace";
import { loadGardenNotes } from "./garden";
import { plainExcerpt } from "./gardenPageUtils";
import { oneLineSnippet } from "./text";
import { generateNoteId } from "./noteUtils";

/**
 * Normalised archive entry. Every kind funnels through ArchiveEntry, so the
 * row only needs title/url/description/tags + a sortDate (used for ordering
 * and year grouping) and a displayDate (rendered in the row, may differ —
 * commonplace notes sort by date-added but display their stated date).
 */
export type ArchiveItem = {
	kind: "blog" | "newsletter" | "commonplace" | "garden";
	category: string;
	tags: string[];
	title: string;
	url: string;
	description: string;
	sortDate: Date;
	displayDate: Date;
};

/** Load every published item across all four collections as a flat ArchiveItem[]. */
export async function loadArchiveItems(): Promise<ArchiveItem[]> {
	const [posts, newsletters, commonplaceNotes, gardenNotes] = await Promise.all(
		[
			getCollection("blog", ({ data }) => !data.draft),
			getCollection("newsletter", ({ data }) => !data.draft),
			loadCommonplaceNotes(),
			loadGardenNotes(),
		],
	);

	return [
		...posts.map(
			(post): ArchiveItem => ({
				kind: "blog",
				category: MAIN_PAGES.writing.label,
				tags: post.data.tags,
				title: post.data.title,
				url: `/writing/${post.id}/`,
				description: post.data.abstract ?? post.data.description,
				sortDate: post.data.pubDate,
				displayDate: post.data.pubDate,
			}),
		),
		...newsletters.map(
			(entry): ArchiveItem => ({
				kind: "newsletter",
				category: MAIN_PAGES.newsletter.label,
				tags: entry.data.tags,
				title: `Issue ${entry.data.issueNumber}: ${entry.data.title}`,
				url: `/newsletter/${entry.id}/`,
				description: entry.data.description ?? "",
				sortDate: entry.data.pubDate,
				displayDate: entry.data.pubDate,
			}),
		),
		...commonplaceNotes.map((note): ArchiveItem => {
			const noteId = generateNoteId({
				content: note.content,
				author: note.author,
				date: note.date,
			});
			return {
				kind: "commonplace",
				category: MAIN_PAGES.commonplace.label,
				tags: note.tags,
				title: `"${oneLineSnippet(note.content, 140)}"`,
				url: `${MAIN_PAGES.commonplace.href}#${noteId}`,
				description: formatAttribution(note),
				sortDate: note.addedAt,
				displayDate: note.date ?? note.addedAt,
			};
		}),
		...gardenNotes.map(
			(note): ArchiveItem => ({
				kind: "garden",
				category: MAIN_PAGES.garden.label,
				tags: note.tags,
				title: note.title,
				url: `/garden/${note.slug}/`,
				description: plainExcerpt(note.content),
				sortDate: note.date ?? note.updatedAt,
				displayDate: note.date ?? note.updatedAt,
			}),
		),
	];
}

/** Sort newest-first. */
export function sortArchiveItems(items: ArchiveItem[]): ArchiveItem[] {
	return [...items].sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
}

/** Group a sorted item list into [year, items[]] tuples, newest year first.
 *  Years are UTC, matching the dates formatted by lib/date.ts. */
export function groupByYear(
	items: ArchiveItem[],
): Array<[string, ArchiveItem[]]> {
	const byYear = new Map<string, ArchiveItem[]>();
	for (const item of items) {
		const year = String(item.sortDate.getUTCFullYear());
		const bucket = byYear.get(year);
		if (bucket) bucket.push(item);
		else byYear.set(year, [item]);
	}
	return [...byYear].sort((a, b) => Number(b[0]) - Number(a[0]));
}
