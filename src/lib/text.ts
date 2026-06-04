export const normalizeWhitespace = (value: string) =>
	value
		.replace(/\s+/g, " ")
		.replace(/\s+([.,!?;:])/g, "$1")
		.trim();

interface EllipsizeOptions {
	alwaysAppend?: boolean;
}

export const ellipsizeText = (
	value: string,
	limit = 200,
	{ alwaysAppend = false }: EllipsizeOptions = {},
) => {
	if (!value) return "";
	const normalized = normalizeWhitespace(value);
	if (!normalized) return "";
	const limited =
		normalized.length > limit ? normalized.slice(0, limit).trim() : normalized;
	const shouldAppend = normalized.length > limit || alwaysAppend;
	const cleaned = shouldAppend ? limited.replace(/[\s.,;:!-]+$/u, "") : limited;
	return shouldAppend ? `${cleaned}…` : cleaned;
};

/**
 * Collapse a passage to a single line and truncate at a word boundary, adding
 * an ellipsis when cut. Used for one-line quote/title snippets in index lists.
 */
export const oneLineSnippet = (text: string, max = 160): string => {
	const collapsed = text.replace(/\s+/g, " ").trim();
	if (collapsed.length <= max) return collapsed;
	const cut = collapsed.slice(0, max);
	const lastSpace = cut.lastIndexOf(" ");
	return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
};

/**
 * Strip Obsidian embeds/wikilinks, markdown link syntax, and markdown
 * punctuation to yield plain prose. Does not truncate — compose with
 * {@link ellipsizeText} when a length limit is needed.
 */
export const plainExcerpt = (content: string): string =>
	content
		.replace(/!?\[\[[^\]]+\]\]/g, " ")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[`#>*_[\]\\]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
