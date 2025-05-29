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
    lang: z.string().optional(),
    published: z.boolean(),
  }),
});

const albums = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
      published: z.boolean(),
      cover: image(),
      coverAlt: z.string(),
      images: z.array(
        z.object({
          file: image(),
          alt: z.string(),
        })
      ),
    }),
});

export const collections = { blog, albums };
