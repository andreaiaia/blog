<script>
  import css from './CtaLink.module.scss'

  export let linkTo = ''
  export let text = ''
  export let addStyle = ''
</script>

<a class={`${css.cta} ${addStyle}`} href={linkTo} data-text={text}>
  <slot />
</a>
