<script>
  import css from './CtaText.module.scss'

  export let text = ''
  export let addStyle = ''
</script>

<p class={`${css.cta} ${addStyle}`} data-text={text}>
  <slot />
</p>
