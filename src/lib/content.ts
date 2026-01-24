export type WithSlug<T extends { id: string }> = T & {
	slug: string;
};

export const withSlug = <T extends { id: string }>(entry: T): WithSlug<T> => ({
	...entry,
	slug: entry.id,
});

export const withSlugs = <T extends { id: string }>(
	entries: readonly T[],
): WithSlug<T>[] => entries.map(withSlug);

export type BlogEntry = {
	id: string;
	slug: string;
	data: {
		title: string;
		description: string;
		abstract?: string;
		pubDate: Date;
		tags?: string[];
		heroImage?: string;
		featured?: boolean;
		draft?: boolean;
	};
	body?: string;
};

export type NewsletterEntry = {
	id: string;
	slug: string;
	data: {
		issueNumber: number;
		title: string;
		subject?: string;
		pubDate: Date;
		tags?: string[];
		description?: string;
		draft?: boolean;
		sent?: boolean;
		sentAt?: Date;
	};
	body?: string;
};
