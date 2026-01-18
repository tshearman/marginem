import type { ComponentChild } from "preact";

const formatDateLabelParts = (value: string) => {
	const parts: ComponentChild[] = [];
	const pattern = /(\d{1,2})(st|nd|rd|th)/g;
	let lastIndex = 0;
	let match = pattern.exec(value);
	while (match) {
		const [full, day, suffix] = match;
		const start = match.index ?? 0;
		if (start > lastIndex) {
			parts.push(value.slice(lastIndex, start));
		}
		parts.push(
			<span>
				{day}
				<sup>{suffix}</sup>
			</span>,
		);
		lastIndex = start + full.length;
		match = pattern.exec(value);
	}
	if (lastIndex < value.length) {
		parts.push(value.slice(lastIndex));
	}
	return parts;
};

type Props = {
	datetime: string | Date;
	label?: string;
	className?: string;
};

export function DateStamp(props: Props) {
	const { datetime, label = "", className } = props;
	const isoDate =
		typeof datetime === "string" ? datetime : datetime.toISOString();
	const labelParts = label ? formatDateLabelParts(label) : null;

	return (
		<time datetime={isoDate} class={`date-stamp ${className ?? ""}`.trim()}>
			{labelParts}
		</time>
	);
}

export type DateStampProps = Props;
