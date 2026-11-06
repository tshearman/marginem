import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Garden and commonplace notes are raw Obsidian markdown read straight from
// disk by src/lib/garden.ts and src/lib/commonplace.ts, not collections.

const blog = defineCollection({
	loader: glob({ base: "content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		description: z.string(),
		abstract: z.string().optional(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		featured: z.boolean().optional(),
	}),
});

const newsletter = defineCollection({
	loader: glob({ base: "content/newsletter", pattern: "**/*.{md,mdx}" }),
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

export const collections = { blog, newsletter };
