<script>
  import css from './Polaroid.module.scss'

  export let cname
  export let src
  export let alt
  export let to
</script>

{#if to}
  <a class={`${css.container} ${css.link} ${cname || ''}`} href={to || '#'}>
    <div class={css.img}>
      <img {src} alt={alt || ''} width="300" height="300" />
    </div>
    <div class={css.title}>
      <p>{alt}</p>
    </div>
  </a>
{:else}
  <div class={`${css.container} ${cname || ''}`}>
    <div class={css.img}>
      <img {src} alt={alt || ''} width="300" height="300" />
    </div>
    <div class={css.title}>
      <p>{alt}</p>
    </div>
  </div>
{/if}
