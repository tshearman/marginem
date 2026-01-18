const defaultOptions: Intl.DateTimeFormatOptions = {
	month: "long",
	day: "numeric",
	year: "numeric",
};
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

export const formatDateLabelHtml = (value: string) =>
	value.replace(/(\d{1,2})(st|nd|rd|th)/g, "$1<sup>$2</sup>");

export const formatDate = (
	value: Date | string,
	options?: Intl.DateTimeFormatOptions,
) => {
	const toDate = (input: Date | string) => {
		if (input instanceof Date) return input;
		const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
		if (isoMatch) {
			const [, year, month, day] = isoMatch.map(Number);
			return new Date(year, month - 1, day);
		}
		return new Date(input);
	};

	const date = toDate(value);
	if (!(date instanceof Date) || Number.isNaN(date.valueOf())) {
		return "";
	}
	const includeYear = options ? Boolean(options.year) : true;
	const monthOption = options?.month ?? defaultOptions.month;
	const monthLabel = new Intl.DateTimeFormat("en", {
		month: monthOption,
	}).format(date);
	const dayNumber = date.getDate();
	const dayLabel = `${dayNumber}${getOrdinalSuffix(dayNumber)}`;
	if (!includeYear) {
		return `${monthLabel} ${dayLabel}`;
	}
	const yearLabel = new Intl.DateTimeFormat("en", {
		year: options?.year ?? "numeric",
	}).format(date);
	return `${monthLabel} ${dayLabel}, ${yearLabel}`;
};
