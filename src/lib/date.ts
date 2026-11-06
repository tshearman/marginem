// Dates are formatted in UTC: frontmatter dates parse to UTC midnight, so
// local-time formatting would shift them a day west of Greenwich (and make
// local builds disagree with Cloudflare's UTC builds).

const getOrdinalSuffix = (value: number) => {
	const remainder = value % 100;
	if (remainder >= 11 && remainder <= 13) return "th";
	switch (value % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

/** "January 2nd, 2024". Passing options without `year` omits the year. */
export const formatDate = (
	value: Date | string,
	options?: Intl.DateTimeFormatOptions,
) => {
	const ymd =
		typeof value === "string" ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) : null;
	const date = ymd
		? new Date(Date.UTC(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3])))
		: new Date(value);
	if (Number.isNaN(date.valueOf())) return "";

	const format = (opts: Intl.DateTimeFormatOptions) =>
		new Intl.DateTimeFormat("en", { ...opts, timeZone: "UTC" }).format(date);
	const month = format({ month: options?.month ?? "long" });
	const day = date.getUTCDate();
	const label = `${month} ${day}${getOrdinalSuffix(day)}`;
	if (options && !options.year) return label;
	return `${label}, ${format({ year: options?.year ?? "numeric" })}`;
};
