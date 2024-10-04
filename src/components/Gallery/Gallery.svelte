<script>
  import css from './Gallery.module.scss';
  export let images = [];
</script>

<div class={css.galleryGrid}>
  {#each images as image}
    <img src={image.srcset.w800} alt={image.alt} />
  {/each}
</div>
