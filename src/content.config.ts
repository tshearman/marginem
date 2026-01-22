import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		abstract: z.string().optional(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		featured: z.boolean().optional(),
	}),
});

const commonplace = defineCollection({
	type: "content",
	schema: z.object({
		author: z.string().optional(),
		source: z.string().optional(),
		tags: z.array(z.string()).default([]),
		date: z.coerce.date().optional(),
		draft: z.boolean().optional(),
		title: z.string().optional(),
	}),
});

const garden = defineCollection({
	type: "content",
	schema: z.object({
		published: z.boolean().optional(),
		tags: z.array(z.string()).default([]),
		date: z.coerce.date().optional(),
		draft: z.boolean().optional(),
		title: z.string().optional(),
	}),
});

const imgs = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().optional(),
		title: z.string().optional(),
	}),
});

const snippets = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().optional(),
		title: z.string().optional(),
	}),
});

const newsletter = defineCollection({
	type: "content",
	schema: z.object({
		issueNumber: z.number().int().nonnegative(),
		title: z.string(),
		subject: z.string().optional(),
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		sent: z.boolean().default(false),
		sentAt: z.coerce.date().optional(),
		description: z.string().optional(),
	}),
});

export const collections = {
	blog,
	commonplace,
	garden,
	imgs,
	snippets,
	newsletter,
};
