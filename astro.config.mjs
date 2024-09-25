import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), svelte()],
  output: 'server',
  adapter: cloudflare({
    runtime: {
      mode: 'local',
    },
  }),
  vite: {
    server: {
      watch: {
        ignored: ['./nextsrc/**'],
      },
    },
  },
});
