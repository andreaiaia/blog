<script>
  import css from './Tag.module.scss'

  export let tag
  export let to
  export let anchor
</script>

{#if anchor}
  <a href={to} class={css.tag}>
    {tag}
  </a>
{:else}
  <a href={to || '#'} class={css.tag}>
    {tag}
  </a>
{/if}
