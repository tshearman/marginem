import type { ComponentChildren } from "preact";
import { DateStamp } from "./DateStamp";
import { Tag } from "./Tag";

type Props = {
	content: string;
	source?: string;
	author?: string;
	tags?: string[];
	dateLabel?: string;
	dateTime?: string | Date;
	className?: string;
	style?: string;
	id?: string;
	dataTags?: string;
	variant?: "default" | "search";
	href?: string;
	showPermalink?: boolean;
	kindLabel?: string;
	children?: ComponentChildren;
};

export function NoteCard(props: Props) {
	const {
		content,
		source,
		author,
		tags = [],
		dateLabel,
		dateTime,
		className,
		style,
		id,
		dataTags,
		variant = "default",
		href,
		showPermalink = true,
		kindLabel,
		children,
	} = props;

	const wrapperClass =
		variant === "search"
			? "note-card note-card--interactive"
			: `note-card ${className || ""}`.trim();

	const Wrapper = variant === "search" ? "a" : "article";
	const wrapperProps =
		variant === "search"
			? { href }
			: { id, style, "data-tags": dataTags };

	return (
		<Wrapper class={wrapperClass} {...wrapperProps}>
			{variant === "default" && showPermalink && id ? (
				<a
					class="note-card__anchor-link"
					href={`#${id}`}
					aria-label="Permalink to this note"
				>
					#
				</a>
			) : null}
			<div class="note-content-wrapper">
				<div class="note-content">
					<blockquote class="note-text">{content}</blockquote>
					<div class="note-attribution">
						{author ? <div class="note-author">{author}</div> : null}
						{source ? <div class="note-source">{source}</div> : null}
						{dateLabel ? (
							<DateStamp
								datetime={dateTime ?? ""}
								className="note-date"
								label={dateLabel}
							/>
						) : null}
						{kindLabel ? <span class="search-kind">{kindLabel}</span> : null}
					</div>
				</div>
				{tags.length ? (
					<div class="note-tags">
						{tags.map((tagValue) => (
							<Tag key={tagValue} tag={tagValue} variant="filter" size="small" />
						))}
					</div>
				) : null}
				{variant === "default" && children ? (
					<div class="note-like">{children}</div>
				) : null}
			</div>
		</Wrapper>
	);
}

export type NoteCardProps = Props;
