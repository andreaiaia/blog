import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import { remarkReadingTime } from './remark-reading-time.mjs';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
    mdx(),
    sitemap(),
    svelte(),
    icon({
      iconDir: 'node_modules/@iconify/json/json',
    }),
  ],
  output: 'static',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});
