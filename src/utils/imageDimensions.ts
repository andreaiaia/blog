import dimensionsCache from '../../.image-dimensions-cache.json';

type Dimensions = { width: number; height: number };

const cache: Record<string, Dimensions> = dimensionsCache;

export function getImageDimensions(src: string): Dimensions {
  const dimensions = cache[src];

  if (!dimensions) {
    throw new Error(
      `Missing cached dimensions for "${src}". Run "pnpm fetch:image-dimensions" (or just "pnpm build"/"pnpm dev", which run it automatically) after adding new album photos.`
    );
  }

  return dimensions;
}
