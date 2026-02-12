import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(), // Transform string to Date object
    image: z.string(),
    lang: z.enum(['it', 'en']).default('it'),
    published: z.boolean(),
  }),
});

const albums = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    published: z.boolean(),
    cover: z.string(),
    coverAlt: z.string(),
    images: z.array(
      z.object({
        file: z.string(),
        alt: z.string(),
      })
    ),
  }),
});

export const collections = { blog, albums };
