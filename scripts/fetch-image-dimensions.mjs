// Probes the real width/height of every album photo from the public CDN and
// caches them to .image-dimensions-cache.json. Runs as a plain Node script
// (not through Astro/Vite) because the Cloudflare adapter prerenders pages in
// a workerd-like runtime where `fs` writes aren't available, so this can't
// happen at page-render time.
import { imageSize } from 'image-size';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

for (const envFile of ['.env', '.env.local']) {
  if (existsSync(envFile)) process.loadEnvFile(envFile);
}

const ALBUMS_DIR = path.resolve('src/content/albums');
const CACHE_PATH = path.resolve('.image-dimensions-cache.json');
const RANGE_BYTES = 131072; // 128KB: enough to reach the header of almost every JPEG
const ASSETS_BASE = process.env.PUBLIC_ASSETS_BASE;

if (!ASSETS_BASE) {
  throw new Error('PUBLIC_ASSETS_BASE is not set (checked .env, .env.local)');
}

async function fetchDimensions(url) {
  const rangedRes = await fetch(url, {
    headers: { Range: `bytes=0-${RANGE_BYTES - 1}` },
  });
  const rangedBuffer = new Uint8Array(await rangedRes.arrayBuffer());

  try {
    const { width, height } = imageSize(rangedBuffer);
    return { width, height };
  } catch {
    const fullRes = await fetch(url);
    const fullBuffer = new Uint8Array(await fullRes.arrayBuffer());
    const { width, height } = imageSize(fullBuffer);
    return { width, height };
  }
}

async function main() {
  const albumFiles = readdirSync(ALBUMS_DIR).filter((f) => f.endsWith('.md'));

  const imagePaths = new Set();
  for (const file of albumFiles) {
    const raw = readFileSync(path.join(ALBUMS_DIR, file), 'utf-8');
    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    const frontmatter = parseYaml(frontmatterMatch[1]);
    for (const image of frontmatter.images ?? []) {
      imagePaths.add(image.file);
    }
  }

  const cache = existsSync(CACHE_PATH)
    ? JSON.parse(await readFile(CACHE_PATH, 'utf-8'))
    : {};

  const missing = [...imagePaths].filter((src) => !cache[src]);

  if (missing.length === 0) {
    console.log(`[image-dimensions] cache up to date (${imagePaths.size} images)`);
    return;
  }

  console.log(`[image-dimensions] fetching ${missing.length} new image(s)...`);

  await Promise.all(
    missing.map(async (src) => {
      const url = `${ASSETS_BASE}/${src.replace(/^\//, '')}`;
      cache[src] = await fetchDimensions(url);
    })
  );

  await writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`, 'utf-8');
  console.log(`[image-dimensions] cache updated (${imagePaths.size} images)`);
}

await main();
