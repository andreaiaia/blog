<script>
  import css from './Tag.module.scss'

  export let href
  export let size = 'large'
</script>

<a
  href={href || '#'}
  class="{css.tag} {size === 'small' ? css.small : ''}"
  {...$$restProps}
>
  <slot />
</a>
