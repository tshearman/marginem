import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    abstract: z.string().optional(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().optional()
  })
});

const notes = defineCollection({
  type: 'data',
  schema: z.array(z.object({
    content: z.string(),
    source: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date().optional()
  }))
});

export const collections = { blog, notes };
