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
	const cleaned = limited.replace(/[\s.,;:!-]+$/u, "");
	const shouldAppend = normalized.length > limit || alwaysAppend;
	return shouldAppend ? `${cleaned}…` : cleaned;
};
