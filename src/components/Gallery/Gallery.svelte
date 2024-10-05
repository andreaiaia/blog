<script>
  import css from './Gallery.module.scss';
  export let images = [];

  let currentImage = null;
  let showLightbox = false;

  const openLightbox = (image) => {
    currentImage = image;
    showLightbox = true;
  };

  const closeLightbox = () => {
    console.log('closeLightbox');
    showLightbox = false;
    currentImage = null;
  };

  const nextImage = () => {
    console.log('nextImage');
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;
    currentImage = images[nextIndex];
  };

  const prevImage = () => {
    console.log('prevImage');
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    currentImage = images[prevIndex];
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowRight') nextImage(event);
    if (event.key === 'ArrowLeft') prevImage(event);
  };
</script>

<div class={css.gallery}>
  {#each images as image}
    <button
      on:click={() => openLightbox(image)}
      class={css.imageButton}
      aria-label="Open image in lightbox"
    >
      <img
        alt={image.alt}
        src={image.srcset.w800}
        srcset={`
          ${image.srcset.w400} 400w,
          ${image.srcset.w800} 800w,
          ${image.srcset.w1024} 1024w,
        `}
        sizes="1024px"
        loading="lazy"
      />
    </button>
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
      <!-- svelte-ignore a11y-no-redundant-roles -->
      <button
        class={css.lightboxContent}
        on:click|stopPropagation
        role="button"
        aria-label="Lightbox content"
      >
        <img src={currentImage.srcset.w1024} alt={currentImage.alt} />
      </button>

      <button
        class={css.closeButton}
        on:click|stopPropagation={closeLightbox}
        aria-label="Close lightbox"
      >
        ✕
      </button>
      <button
        class={css.prevButton}
        on:click|stopPropagation={prevImage}
        aria-label="Previous image"
      >
        ←
      </button>
      <button
        class={css.nextButton}
        on:click|stopPropagation={nextImage}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  {/if}
</div>
