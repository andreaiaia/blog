import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(), // Transform string to Date object
    image: z.string(),
    lang: z.string().optional(),
    published: z.boolean(),
  }),
});

const albums = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    published: z.boolean(),
    cover: z.string(),
    coverAlt: z.string(),
    images: z.array(
      z.object({
        baseUrl: z.string(),
        description: z.string().optional(),
        alt: z.string(),
      })
    ),
  }),
});

export const collections = { blog, albums };
