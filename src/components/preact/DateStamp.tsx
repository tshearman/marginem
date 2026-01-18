import { formatDateLabelHtml } from "../../lib/date";

type Props = {
	datetime: string | Date;
	label?: string;
	className?: string;
};

export function DateStamp(props: Props) {
	const { datetime, label = "", className } = props;
	const isoDate =
		typeof datetime === "string" ? datetime : datetime.toISOString();
	const renderedLabel = formatDateLabelHtml(label);

	return (
		<time datetime={isoDate} class={`date-stamp ${className ?? ""}`.trim()}>
			{label ? (
				<span dangerouslySetInnerHTML={{ __html: renderedLabel }} />
			) : null}
		</time>
	);
}

export type DateStampProps = Props;
