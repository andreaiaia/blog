<script>
  import Navbar from '../Navbar/Navbar.svelte'

  import css from './Header.module.scss'

  export let addStyle = ''
  export let headerMode = 'solid'
</script>

<header
  class={`${css.header} ${addStyle} ${headerMode === 'solid' ? css.solid : ''}`}
>
  <div class={css.container}>
    <div class={css.logo}>
      <a href="/"> andrea </a>
    </div>
    <Navbar />
  </div>
</header>
