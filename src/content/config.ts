import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(), // Transform string to Date object
    image: z.string().optional(),
    lang: z.string().optional(),
    published: z.boolean().optional(),
  }),
});

const albums = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    published: z.boolean(),
    cover: z.object({
      w400: z.string(),
      w800: z.string(),
      w1024: z.string(),
      w1600: z.string(),
      w2560: z.string(),
    }),
    coverAlt: z.string(),
    images: z.array(
      z.object({
        srcset: z.object({
          w400: z.string(),
          w800: z.string(),
          w1024: z.string(),
          w1600: z.string(),
          w2560: z.string(),
        }),
        description: z.string().optional(),
        alt: z.string(),
      })
    ),
  }),
});

export const collections = { blog, albums };
