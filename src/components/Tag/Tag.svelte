<script>
  import css from './Tag.module.scss'

  export let href
</script>

<a href={href || '#'} class={css.tag}>
  <slot />
</a>
