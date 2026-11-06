/** One /api/search.json entry: everything the search modal needs. */
export type SearchItem = {
	/** Lower-cased text that queries are matched against. */
	searchText: string;
	/** Sort key, newest first. */
	timestamp: number;
	/** Prerendered result card (trusted markup from card-html.ts). */
	html: string;
};
