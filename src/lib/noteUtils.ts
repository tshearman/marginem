/**
 * Stable anchor id for a commonplace note: content and author slugs plus a
 * short hash. Used for permalinks, so the output must not change.
 */
export const generateNoteId = ({
	content = "",
	author,
	date,
}: {
	content?: string;
	author?: string;
	date?: Date;
}) => {
	const baseAuthor = author || "unknown";
	const slugify = (value: string, max: number) =>
		value
			.toLowerCase()
			.replace(/[^a-z0-9\s]/g, "")
			.trim()
			.replace(/\s+/g, "-")
			.slice(0, max);

	const hashSource = `${content}|${baseAuthor}|${
		date ? date.toISOString() : ""
	}`;
	let hash = 0;
	for (let i = 0; i < hashSource.length; i++) {
		hash = (hash << 5) - hash + hashSource.charCodeAt(i);
		hash |= 0;
	}
	const hashHex = Math.abs(hash).toString(16).padStart(8, "0").slice(0, 8);
	return `${slugify(content, 30)}-${slugify(baseAuthor, 20)}-${hashHex}`;
};
