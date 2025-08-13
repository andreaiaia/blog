<script>
  import css from './Gallery.module.scss';
  import CFImage from '../CFImage/CFImage.svelte';
  export let images = [];

  let currentImage = null;
  let showLightbox = false;

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
</script>

<div class={css.gallery}>
  {#each images as image}
    <button
      on:click={() => openLightbox(image)}
      class={css.imageButton}
      aria-label="Open image in lightbox"
    >
      <CFImage
        src={image.file}
        alt={image.alt}
        sizes="(max-width: 768px) 100vw, 33vw"
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
      <img
        class={css.lightboxContent}
        src={currentImage.file}
        alt={currentImage.alt}
      />

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
