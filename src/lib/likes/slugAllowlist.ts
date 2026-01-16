import { getCollection, type CollectionEntry } from "astro:content";
import { generateNoteId } from "../noteUtils";

let cached: Set<string> | null = null;

const buildPostSlugs = async () => {
	const posts = await getCollection("blog", ({ data }) => !data.draft);
	return posts.map((post) => post.slug);
};

const buildNoteSlugs = async () => {
	const noteFiles = await getCollection("notes");
	return noteFiles.flatMap((file: CollectionEntry<"notes">) =>
		file.data.map((entry) =>
			generateNoteId({
				content: entry.content,
				author: entry.author,
				tags: entry.tags,
				date: entry.date ? new Date(entry.date) : undefined,
			}),
		),
	);
};

const buildAllowlist = async () => {
	const [postSlugs, noteSlugs] = await Promise.all([
		buildPostSlugs(),
		buildNoteSlugs(),
	]);
	return new Set([...postSlugs, ...noteSlugs]);
};

export const getAllowedSlugs = async () => {
	if (cached) return cached;
	cached = await buildAllowlist();
	return cached;
};
