<script>
  import css from './TextHoverAnimation.module.scss';

  export let text = '';
  export let addStyle = '';
</script>

<p class={`${css.cta} ${addStyle}`} data-text={text}>
  {text}
</p>
