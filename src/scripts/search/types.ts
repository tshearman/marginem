export type SearchItem = {
	id: string;
	title: string;
	snippet: string;
	tags?: string[];
	pubDate?: string;
	displayDate?: string;
	url: string;
	kind: "post" | "note" | "garden";
	author?: string;
	source?: string;
	searchText: string;
	timestamp: number;
	html: string;
};
