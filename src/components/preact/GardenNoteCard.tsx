import { DateStamp } from "./DateStamp";

type Props = {
	title: string;
	excerpt?: string;
	updatedAt?: string | Date;
	dateLabel?: string;
	href?: string;
	variant?: "card" | "search";
	kindLabel?: string;
};

export function GardenNoteCard(props: Props) {
	const {
		title,
		excerpt = "",
		updatedAt,
		dateLabel,
		href = "#",
		variant = "card",
		kindLabel,
	} = props;

	if (variant === "search") {
		return (
			<a class="garden-search" href={href}>
				<div class="garden-search__header">
					<h3 class="garden-search__title">{title}</h3>
					{dateLabel ? (
						<DateStamp
							datetime={updatedAt ?? ""}
							className="garden-search__date"
							label={dateLabel}
						/>
					) : null}
					{kindLabel ? <span class="search-kind">{kindLabel}</span> : null}
				</div>
				{excerpt ? <p class="garden-search__excerpt">{excerpt}</p> : null}
			</a>
		);
	}

	return (
		<a class="garden-card" href={href}>
			<div class="garden-card__row">
				{dateLabel ? (
					<DateStamp
						datetime={updatedAt ?? ""}
						className="garden-card__date"
						label={dateLabel}
					/>
				) : null}
				<h3>{title}</h3>
			</div>
			<p class="garden-card__excerpt">{excerpt}</p>
		</a>
	);
}

export type GardenNoteCardProps = Props;
