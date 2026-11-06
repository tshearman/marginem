import type { CollectionEntry } from "astro:content";

/** Mirror each entry's `id` as `slug`, which the pages use for URLs. */
export const withSlugs = <T extends { id: string }>(entries: readonly T[]) =>
	entries.map((entry) => ({ ...entry, slug: entry.id }));

export type BlogEntry = CollectionEntry<"blog"> & { slug: string };
