import { getCollection } from "astro:content";
import { MAIN_PAGES } from "./site";
import { formatAttribution, loadCommonplaceNotes } from "./commonplace";
import { loadGardenNotes } from "./garden";
import { plainExcerpt } from "./gardenPageUtils";
import { oneLineSnippet } from "./text";
import { generateNoteId } from "./noteUtils";
import { withSlugs } from "./content";

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
	sortDate?: Date;
	displayDate?: Date;
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

	const postsWithSlugs = withSlugs(posts);
	const newslettersWithSlugs = withSlugs(newsletters);

	return [
		...postsWithSlugs.map(
			(post): ArchiveItem => ({
				kind: "blog",
				category: MAIN_PAGES.writing.label,
				tags: post.data.tags ?? [],
				title: post.data.title,
				url: `/posts/${post.slug}/`,
				description: post.data.abstract ?? post.data.description ?? "",
				sortDate: post.data.pubDate,
				displayDate: post.data.pubDate,
			}),
		),
		...newslettersWithSlugs.map(
			(entry): ArchiveItem => ({
				kind: "newsletter",
				category: MAIN_PAGES.newsletter.label,
				tags: entry.data.tags ?? [],
				title: `Issue ${entry.data.issueNumber}: ${entry.data.title}`,
				url: `/newsletter/${entry.slug}/`,
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
				tags: note.tags ?? [],
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
				tags: note.tags ?? [],
				title: note.title,
				url: `/garden/${note.slug}/`,
				description: plainExcerpt(note.content),
				sortDate: note.date ?? note.updatedAt,
				displayDate: note.date ?? note.updatedAt,
			}),
		),
	];
}

/** Sort newest-first, falling back to title for undated items. */
export function sortArchiveItems(items: ArchiveItem[]): ArchiveItem[] {
	return [...items].sort((a, b) => {
		const aTime = a.sortDate?.getTime();
		const bTime = b.sortDate?.getTime();
		if (aTime != null && bTime != null) return bTime - aTime;
		if (aTime != null) return -1;
		if (bTime != null) return 1;
		return a.title.localeCompare(b.title);
	});
}

/** Group a sorted item list into [year, items[]] tuples, newest year first.
 *  Items without a sortDate land in an "Undated" bucket pinned to the end. */
export function groupByYear(
	items: ArchiveItem[],
): Array<[string, ArchiveItem[]]> {
	const byYear: Record<string, ArchiveItem[]> = {};
	for (const item of items) {
		const year = item.sortDate
			? item.sortDate.getFullYear().toString()
			: "Undated";
		if (!byYear[year]) byYear[year] = [];
		byYear[year].push(item);
	}
	return Object.entries(byYear).sort((a, b) => {
		if (a[0] === "Undated") return 1;
		if (b[0] === "Undated") return -1;
		return Number(b[0]) - Number(a[0]);
	});
}
