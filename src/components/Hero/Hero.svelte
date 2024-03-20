<script>
  import css from './Hero.module.scss'

  export let cname
  export let background
</script>

<section class={`${css.hero} ${cname} ${css[background]}`}>
  <div class={`${css.content}`}>
    <slot />
  </div>
</section>
