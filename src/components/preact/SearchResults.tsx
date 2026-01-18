import { formatDate } from "../../lib/date";
import { GardenNoteCard } from "./GardenNoteCard";
import { NoteCard } from "./NoteCard";
import { PostPreview } from "./PostPreview";
import type { SearchItem } from "../../scripts/search/types";

type Props = {
	results: SearchItem[];
};

const getDateLabel = (item: SearchItem) =>
	item.pubDate ? formatDate(item.pubDate) : item.displayDate ?? "";

export function SearchResults(props: Props) {
	const { results } = props;

	return (
		<>
			{results.map((item) => {
				const label = getDateLabel(item);
				if (item.kind === "note") {
					return (
						<NoteCard
							key={item.id}
							variant="search"
							href={item.url}
							content={item.snippet || item.title || ""}
							author={item.author}
							source={item.source}
							tags={item.tags}
							dateLabel={label}
							dateTime={item.pubDate}
							kindLabel="Note"
						/>
					);
				}

				if (item.kind === "garden") {
					return (
						<GardenNoteCard
							key={item.id}
							variant="search"
							href={item.url}
							title={item.title}
							excerpt={item.snippet}
							dateLabel={label}
							updatedAt={item.pubDate}
							kindLabel="Garden"
						/>
					);
				}

				return (
					<PostPreview
						key={item.id}
						title={item.title}
						url={item.url}
						pubDate={item.pubDate ?? ""}
						displayDate={label}
						excerpt={item.snippet}
						tags={item.tags}
						kindLabel="Writing"
					/>
				);
			})}
		</>
	);
}

export type SearchResultsProps = Props;
