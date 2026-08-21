<script>
  import { onMount } from 'svelte';
  import css from './Gallery.module.scss';
  import CFImage from '../CFImage/CFImage.svelte';

  export let rows = [];

  $: images = rows.flat();

  let currentImage = null;
  let showLightbox = false;
  let galleryEl;

  // Browsers have a long-standing class of bugs where a flex item's
  // `aspect-ratio`-derived size (combined with flex-basis: 0) goes stale
  // during a continuous window resize, instead of recomputing against the
  // container's current width — it self-corrects the moment `display`
  // changes (e.g. crossing the mobile breakpoint), which is what a forced
  // reflow does here without touching any of our own layout math.
  const RESIZE_REFLOW_DEBOUNCE = 150;

  onMount(() => {
    let resizeTimeout;

    const forceReflow = () => {
      if (!galleryEl) return;
      galleryEl.style.display = 'none';
      void galleryEl.offsetHeight;
      galleryEl.style.display = '';
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(forceReflow, RESIZE_REFLOW_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  });

  const openLightbox = (image) => {
    currentImage = image;
    showLightbox = true;
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    showLightbox = false;
    currentImage = null;
    document.body.classList.remove('no-scroll');
  };

  const nextImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    currentImage = images[nextIndex];
  };

  const prevImage = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    currentImage = images[prevIndex];
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') nextImage(event);
    if (event.key === 'ArrowLeft') prevImage(event);
  };

  // .gallery's content width, so the browser fetches an image sized for how
  // much of the row this photo actually occupies rather than a flat guess —
  // a solo panorama row (share = 1) needs a much bigger source than a photo
  // in a 4-vertical row (share ≈ 0.25).
  const contentWidth = 'min(100vw, 1200px) - 32px';
  const sizesFor = (share) =>
    `(max-width: 640px) 100vw, calc((${contentWidth}) * ${share.toFixed(3)})`;
</script>

<div class={css.gallery} bind:this={galleryEl}>
  {#each rows as row}
    {@const rowAspectRatio = row.reduce(
      (sum, image) => sum + image.width / image.height,
      0
    )}
    <div class={css.row} style={`--row-ar:${rowAspectRatio}`}>
      {#each row as image}
        <button
          on:click={() => openLightbox(image)}
          class={css.item}
          style={`--item-ar:${image.width / image.height}`}
          aria-label="Open image in lightbox"
        >
          <CFImage
            src={image.file}
            alt={image.alt}
            className={css.image}
            sizes={sizesFor(image.width / image.height / rowAspectRatio)}
          />
        </button>
      {/each}
    </div>
  {/each}
  {#if showLightbox}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div
      class={css.lightbox}
      on:click={closeLightbox}
      role="dialog"
      aria-modal="true"
      tabindex="0"
      on:keydown={handleKeyDown}
    >
      {#key currentImage.file}
        <CFImage
          className={css.lightboxContent}
          src={currentImage.file}
          alt={currentImage.alt}
          widths={[1200]}
          sizes="90vw"
        />
      {/key}

      <button
        class={`${css.button} ${css.closeButton}`}
        on:click|stopPropagation={closeLightbox}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <button
        class={`${css.button} ${css.prevButton}`}
        on:click|stopPropagation={prevImage}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        class={`${css.button} ${css.nextButton}`}
        on:click|stopPropagation={nextImage}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  {/if}
</div>
