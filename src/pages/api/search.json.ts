import type { APIRoute } from "astro";
import { type CollectionEntry, getCollection } from "astro:content";
import type { SearchItem } from "../../scripts/search/types";
import { type GardenNote, loadGardenNotes } from "../../lib/garden";
import {
	type CommonplaceNote,
	loadCommonplaceNotes,
} from "../../lib/commonplace";
import { generateNoteId } from "../../lib/noteUtils";
import {
	ellipsizeText,
	normalizeWhitespace,
	toPlainText,
} from "../../lib/text";
import { formatDate } from "../../lib/date";
import {
	renderGardenNoteCard,
	renderNoteCard,
	renderPostPreview,
} from "../../lib/card-html";
import { KIND_LABELS } from "../../lib/kinds";

// Each entry's `html` is injected by the search modal via innerHTML, so it
// must be trusted markup — card-html.ts builds it here from our own content.

const toSearchText = (...segments: Array<string | undefined>) =>
	segments
		.map((segment) =>
			segment ? normalizeWhitespace(segment).toLowerCase() : "",
		)
		.filter(Boolean)
		.join(" ");

const postEntry = (post: CollectionEntry<"blog">): SearchItem => {
	const { title, description, abstract, pubDate, tags } = post.data;
	const url = `/writing/${post.id}/`;
	const snippet = ellipsizeText(abstract ?? description, 240, {
		alwaysAppend: true,
	});
	const displayDate = formatDate(pubDate);
	const pubIso = pubDate.toISOString();
	return {
		timestamp: pubDate.getTime(),
		searchText: toSearchText(
			title,
			description,
			abstract,
			post.body,
			tags.join(" "),
		),
		html: renderPostPreview({
			id: post.id,
			title,
			url,
			pubDate: pubIso,
			displayDate,
			excerpt: snippet,
			tags,
			kindLabel: KIND_LABELS.writing,
		}),
	};
};

const noteEntry = (note: CommonplaceNote): SearchItem => {
	const { content, author, source, tags, date } = note;
	const id = generateNoteId({ content, author, date });
	const url = `/commonplace/#${id}`;
	const snippet = ellipsizeText(content, 220, { alwaysAppend: true });
	const displayDate = date ? formatDate(date) : "";
	const pubIso = date ? date.toISOString() : "";
	return {
		timestamp: date ? date.getTime() : 0,
		searchText: toSearchText(content, author, source, tags.join(" ")),
		html: renderNoteCard({
			variant: "search",
			href: url,
			content: snippet || author || "",
			author,
			source,
			tags,
			dateLabel: displayDate,
			dateTime: pubIso,
			kindLabel: KIND_LABELS.note,
		}),
	};
};

const gardenEntry = (note: GardenNote): SearchItem => {
	const url = `/garden/${note.slug}/`;
	const snippet = ellipsizeText(toPlainText(note.content), 220, {
		alwaysAppend: true,
	});
	const displayDate = formatDate(note.updatedAt);
	const pubIso = note.updatedAt.toISOString();
	return {
		timestamp: note.updatedAt.getTime(),
		searchText: toSearchText(
			note.title,
			note.relativePath,
			note.content,
			note.tags.join(" "),
		),
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
};

// Prerendered to a static file, so response headers would be discarded.
export const GET: APIRoute = async () => {
	const [posts, notes, gardenNotes] = await Promise.all([
		getCollection("blog", ({ data }) => !data.draft),
		loadCommonplaceNotes(),
		loadGardenNotes(),
	]);
	const payload: SearchItem[] = [
		...posts.map(postEntry),
		...notes.map(noteEntry),
		...gardenNotes.map(gardenEntry),
	];
	return new Response(JSON.stringify(payload));
};
