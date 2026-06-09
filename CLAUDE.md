# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # Start dev server at localhost:4321
pnpm build        # Type-check (astro check) then build to ./dist/
pnpm preview      # Build + serve locally via wrangler pages dev (mirrors Cloudflare)
pnpm deploy       # Build + deploy to Cloudflare Pages via wrangler
```

No test suite exists in this project.

## Architecture

**Framework:** Astro 6 with static output (`output: 'static'`), deployed to Cloudflare Pages. In production the `@astrojs/cloudflare` adapter is added (controlled by `NODE_ENV`). The `wrangler.toml` configures the Cloudflare Worker name.

**UI components:** Svelte 5 is used for interactive components; Astro components handle everything else. `astro-icon` sources icons from `@iconify-json/lucide`. Styles are SCSS modules (`*.module.scss`) per page/component plus a global `global.css`.

**i18n:** Bilingual Italian/English. Italian is the default locale (no URL prefix); English uses the `/en/` prefix. All strings live in `src/i18n/ui.ts`. The `src/i18n/utils.ts` helpers (`getLangFromUrl`, `useTranslations`, `getAlternateLangUrl`, etc.) are used in every page that needs locale-aware text or routing.

**Content collections** (defined in `src/content.config.ts`):
- `blog-it` — Italian blog posts at `src/content/blog/it/YYYY/`
- `blog-en` — English blog posts at `src/content/blog/en/YYYY/`
- `albums` — Photo albums at `src/content/albums/`

Blog post frontmatter: `title`, `description`, `tags[]`, `date`, `image`, `published`.
Album frontmatter: `title`, `description?`, `date`, `published`, `cover`, `coverAlt`, `location?`, `category?`, `images[]` (each with `file` and `alt`).

Only entries with `published: true` are shown. Blog posts use MDX and can import Astro components (e.g., `CFImage`).

**Pages structure:**
- `src/pages/` — Italian routes (default locale)
- `src/pages/en/` — English routes
- Layouts: `BaseLayout.astro`, `BlogPost.astro`, `GalleryLayout.astro`

**Path alias:** `@/` is aliased to `src/` via tsconfig (used for component imports like `@/components/CFImage/CFImage.astro`).

**Image handling:** `CFImage` component in `src/components/CFImage/` integrates with Cloudflare's image service in production. In dev, images are served statically from `public/`.

**Reading time:** Injected via the custom remark plugin `remark-reading-time.mjs` and exposed as `remarkPluginFrontmatter.minutesRead` in layouts.
