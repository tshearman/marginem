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
