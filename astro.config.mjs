import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import { remarkReadingTime } from './remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), svelte()],
  output: 'server',
  adapter: cloudflare({
    runtime: {
      mode: 'production',
    },
  }),
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
