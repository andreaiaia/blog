import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  date: z.coerce.date(), // Transform string to Date object
  image: z.string(),
  published: z.boolean(),
});

const blogIt = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/blog/it',
  }),
  schema: blogSchema,
});

const blogEn = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.{md,mdx}',
    base: './src/content/blog/en',
  }),
  schema: blogSchema,
});

const albums = defineCollection({
  loader: glob({
    pattern: '**/[^_]*.md',
    base: './src/content/albums',
  }),
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

export const collections = { 'blog-it': blogIt, 'blog-en': blogEn, albums };
