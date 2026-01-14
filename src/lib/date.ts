const defaultOptions: Intl.DateTimeFormatOptions = {
	month: "short",
	day: "numeric",
	year: "numeric",
};
const defaultFormatter = new Intl.DateTimeFormat("en", defaultOptions);

export const formatDate = (
	value: Date | string,
	options?: Intl.DateTimeFormatOptions,
) => {
	const date = typeof value === "string" ? new Date(value) : value;
	if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
		return "";
	}
	if (!options) {
		return defaultFormatter.format(date);
	}
	return new Intl.DateTimeFormat("en", options).format(date);
};
