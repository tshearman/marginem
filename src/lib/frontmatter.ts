// Shared frontmatter coercion helpers used by the filesystem-backed loaders
// (garden.ts, commonplace.ts) that read raw Obsidian markdown.

/** Coerce a frontmatter `tags` value into a clean string array. */
export const normalizeTags = (value: unknown): string[] => {
	if (Array.isArray(value)) {
		return value.filter((item): item is string => typeof item === "string");
	}
	if (typeof value === "string") return [value];
	return [];
};

/** Parse a frontmatter date value, returning undefined when absent/invalid. */
export const parseDate = (value: unknown): Date | undefined => {
	if (!value) return undefined;
	const date = new Date(String(value));
	return Number.isNaN(date.getTime()) ? undefined : date;
};
