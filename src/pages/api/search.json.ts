import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { loadGardenNotes } from "../../lib/garden";
import { generateNoteId } from "../../lib/noteUtils";
import {
	ellipsizeText,
	normalizeWhitespace,
	plainExcerpt,
} from "../../lib/text";
import { formatDate } from "../../lib/date";
import { loadCommonplaceNotes } from "../../lib/commonplace";
import { withSlugs, type BlogEntry } from "../../lib/content";
import {
	renderGardenNoteCard,
	renderNoteCard,
	renderPostPreview,
} from "../../lib/card-html";
import { KIND_LABELS } from "../../lib/kinds";

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
	// Prerendered HTML fragment for the search modal. The modal does
	// `container.innerHTML = matches.map(i => i.html).join('')`, so this
	// content must be trusted — it's produced here from our own data.
	html: string;
};

const toSearchText = (segments: Array<string | undefined>) =>
	segments
		.map((segment) =>
			segment ? normalizeWhitespace(segment).toLowerCase() : "",
		)
		.filter(Boolean)
		.join(" ");

const buildPostEntries = (posts: BlogEntry[]) =>
	posts.map((post) => {
		const tags = post.data.tags ?? [];
		const pubDate = post.data.pubDate ?? null;
		const snippetSource =
			post.data.abstract ??
			post.data.description ??
			plainExcerpt(post.body ?? "");
		const snippet = ellipsizeText(snippetSource, 240, { alwaysAppend: true });
		const displayDate = pubDate ? formatDate(pubDate) : "";
		const pubIso = pubDate ? pubDate.toISOString() : "";
		const url = `/writing/${post.slug}/`;
		return {
			id: post.slug,
			kind: "post" as const,
			title: post.data.title,
			url,
			snippet,
			tags,
			displayDate,
			pubDate: pubIso,
			timestamp: pubDate ? pubDate.getTime() : 0,
			searchText: toSearchText([
				post.data.title,
				post.data.description,
				post.data.abstract,
				post.body ?? "",
				tags.join(" "),
			]),
			html: renderPostPreview({
				id: post.slug,
				title: post.data.title,
				url,
				pubDate: pubIso,
				displayDate,
				excerpt: snippet,
				tags,
				kindLabel: KIND_LABELS.writing,
			}),
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
			date: noteDate,
		});
		const snippet = ellipsizeText(entry.content, 220, { alwaysAppend: true });
		const displayDate = noteDate ? formatDate(noteDate) : "";
		const pubIso = noteDate ? noteDate.toISOString() : "";
		const url = `/commonplace/#${id}`;
		return {
			id,
			kind: "note" as const,
			title: entry.author ?? "Commonplace note",
			url,
			snippet,
			tags,
			displayDate,
			pubDate: pubIso,
			timestamp: noteDate ? noteDate.getTime() : 0,
			author: entry.author,
			source: entry.source,
			searchText: toSearchText([
				entry.content,
				entry.author,
				entry.source,
				tags.join(" "),
			]),
			html: renderNoteCard({
				variant: "search",
				href: url,
				content: snippet || entry.author || "",
				author: entry.author,
				source: entry.source,
				tags,
				dateLabel: displayDate,
				dateTime: pubIso,
				kindLabel: KIND_LABELS.note,
			}),
		};
	});

const buildGardenEntries = (
	gardenNotes: Awaited<ReturnType<typeof loadGardenNotes>>,
) =>
	gardenNotes.map((note) => {
		const snippetSource = plainExcerpt(note.content);
		const tags = note.tags ?? [];
		const snippet = ellipsizeText(snippetSource, 220, { alwaysAppend: true });
		const displayDate = formatDate(note.updatedAt);
		const pubIso = note.updatedAt.toISOString();
		const url = `/garden/${note.slug}/`;
		return {
			id: note.slug,
			kind: "garden" as const,
			title: note.title,
			url,
			snippet,
			tags,
			displayDate,
			pubDate: pubIso,
			timestamp: note.updatedAt.getTime(),
			searchText: toSearchText([
				note.title,
				note.relativePath,
				note.content,
				tags.join(" "),
			]),
			html: renderGardenNoteCard({
				variant: "search",
				href: url,
				title: note.title,
				excerpt: snippet,
				dateLabel: displayDate,
				updatedAt: pubIso,
				kindLabel: KIND_LABELS.garden,
			}),
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
