import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { loadGardenNotes } from "../../lib/garden";
import { generateNoteId } from "../../lib/noteUtils";
import { ellipsizeText, normalizeWhitespace } from "../../lib/text";
import { formatDate } from "../../lib/date";
import { loadCommonplaceNotes } from "../../lib/commonplace";
import { withSlugs, type BlogEntry } from "../../lib/content";

export const prerender = true;

type SearchEntry = {
	id: string;
	kind: "post" | "note" | "garden";
	title: string;
	url: string;
	snippet: string;
	tags: string[];
	displayDate?: string;
	pubDate?: string;
	timestamp: number;
	author?: string;
	source?: string;
	searchText: string;
};

const stripFormatting = (value = "") =>
	value
		.replace(/[#>*_`[\]\\]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

const toSearchText = (segments: Array<string | undefined>) =>
	segments
		.map((segment) =>
			segment ? normalizeWhitespace(segment).toLowerCase() : "",
		)
		.filter(Boolean)
		.join(" ");

const plainExcerpt = (value = "") =>
	stripFormatting(value.replace(/!?\[\[[^\]]+\]\]/g, " "));

const buildPostEntries = (posts: BlogEntry[]) =>
	posts.map((post) => {
		const tags = post.data.tags ?? [];
		const pubDate = post.data.pubDate ?? null;
		const snippetSource =
			post.data.abstract ??
			post.data.description ??
			stripFormatting(post.body ?? "");
		return {
			id: post.slug,
			kind: "post" as const,
			title: post.data.title,
			url: `/posts/${post.slug}/`,
			snippet: ellipsizeText(snippetSource, 240, { alwaysAppend: true }),
			tags,
			displayDate: pubDate ? formatDate(pubDate) : "",
			pubDate: pubDate ? pubDate.toISOString() : "",
			timestamp: pubDate ? pubDate.getTime() : 0,
			searchText: toSearchText([
				post.data.title,
				post.data.description,
				post.data.abstract,
				post.body ?? "",
				tags.join(" "),
			]),
		};
	});

const buildNoteEntries = (
	notes: Array<{
		content: string;
		author?: string;
		source?: string;
		tags?: string[];
		date?: Date;
	}>,
) =>
	notes.map((entry) => {
		const noteDate = entry.date;
		const tags = entry.tags ?? [];
		const id = generateNoteId({
			content: entry.content,
			author: entry.author,
			tags,
			date: noteDate,
		});
		return {
			id,
			kind: "note" as const,
			title: entry.author ?? "Commonplace note",
			url: `/commonplace/#${id}`,
			snippet: ellipsizeText(entry.content, 220, { alwaysAppend: true }),
			tags,
			displayDate: noteDate ? formatDate(noteDate) : "",
			pubDate: noteDate ? noteDate.toISOString() : "",
			timestamp: noteDate ? noteDate.getTime() : 0,
			author: entry.author,
			source: entry.source,
			searchText: toSearchText([
				entry.content,
				entry.author,
				entry.source,
				tags.join(" "),
			]),
		};
	});

const buildGardenEntries = (
	gardenNotes: Awaited<ReturnType<typeof loadGardenNotes>>,
) =>
	gardenNotes.map((note) => {
		const snippetSource = plainExcerpt(note.content);
		const tags = note.tags ?? [];
		return {
			id: note.slug,
			kind: "garden" as const,
			title: note.title,
			url: `/garden/${note.slug}/`,
			snippet: ellipsizeText(snippetSource, 220, { alwaysAppend: true }),
			tags,
			displayDate: formatDate(note.updatedAt),
			pubDate: note.updatedAt.toISOString(),
			timestamp: note.updatedAt.getTime(),
			searchText: toSearchText([
				note.title,
				note.relativePath,
				note.content,
				tags.join(" "),
			]),
		};
	});

export const GET: APIRoute = async () => {
	const [posts, vaultNotes, gardenNotes] = await Promise.all([
		getCollection("blog", ({ data }) => !data.draft),
		loadCommonplaceNotes(),
		loadGardenNotes(),
	]);
	const postEntries = buildPostEntries(withSlugs(posts));
	const noteEntries = buildNoteEntries(vaultNotes);
	const gardenEntries = buildGardenEntries(gardenNotes);
	const payload: SearchEntry[] = [
		...postEntries,
		...noteEntries,
		...gardenEntries,
	];

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json",
			// Avoid serving stale search results across deploys.
			"Cache-Control": "no-store, must-revalidate",
			Pragma: "no-cache",
		},
	});
};
