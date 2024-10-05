<script>
  import css from './Gallery.module.scss';
  export let images = [];
</script>

<div class={css.gallery}>
  {#each images as image}
    <img
      alt={image.alt}
      src={image.srcset.w800}
      srcset={`
        ${image.srcset.w400} 400w,
        ${image.srcset.w800} 800w,
        ${image.srcset.w1024} 1024w,
      `}
      sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1024px"
      loading="lazy"
    />
  {/each}
</div>
