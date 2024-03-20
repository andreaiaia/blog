<script>
  import css from './Button.module.scss'

  export let cname
  export let secondary // boolean
  export let type = 'button' // or 'submit' or 'reset'
  export let onClick
</script>

<button
  {type}
  {onClick}
  class={`${css.button} ${cname} ${secondary && css.secondary}`}
>
  <slot />
</button>
