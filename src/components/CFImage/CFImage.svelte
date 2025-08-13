<script lang="ts">
  export let src: string; // percorso R2 es: "viaggi/islanda/aurora.jpg"
  export let alt: string;
  export let widths: number[] = [480, 800, 1200];
  export let sizes: string = '100vw';
  export let className: string = '';
  export let dpr: number = 1;
  export let quality: number = 85;

  // Variabili d'ambiente pubbliche (devono iniziare con VITE_ o PUBLIC_ a seconda del bundler)
  const SITE = import.meta.env.PUBLIC_SITE_URL;
  const ASSETS = import.meta.env.PUBLIC_ASSETS_BASE;

  // Opzioni comuni per trasformazioni Cloudflare
  const opts = `format=auto,metadata=none,quality=${quality},dpr=${dpr}`;

  // URL originale su R2
  const origin = `${ASSETS}/${src.replace(/^\//, '')}`;

  // Srcset responsive
  const srcset = widths
    .map((w) => `${SITE}/cdn-cgi/image/${opts},width=${w}/${origin} ${w}w`)
    .join(', ');

  // Immagine di default (seconda taglia se presente)
  const defaultWidth = widths[Math.min(1, widths.length - 1)];
  const defaultSrc = `${SITE}/cdn-cgi/image/${opts},width=${defaultWidth}/${origin}`;
</script>

<img
  src={defaultSrc}
  {srcset}
  {sizes}
  {alt}
  loading="lazy"
  decoding="async"
  class={className}
/>
