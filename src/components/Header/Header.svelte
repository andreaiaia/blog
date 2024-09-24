<script>
  import Navbar from '../Navbar/Navbar.svelte'

  import css from './Header.module.scss'

  export let addStyle = ''
</script>

<header class={`${css.header} ${addStyle}`}>
  <div class={css.container}>
    <div class={css.logo}>
      <a href="/"> andrea </a>
    </div>
    <Navbar />
  </div>
</header>
