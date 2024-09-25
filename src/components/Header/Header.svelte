<script>
  import css from './Header.module.scss'
  import { MenuIcon, XIcon } from 'svelte-feather-icons'

  export let addStyle = ''
  export let headerMode = 'solid'

  let menuOpen = false

  function toggleMenu() {
    menuOpen = !menuOpen

    if (menuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }
</script>

<header
  class={`${css.header} ${addStyle} ${headerMode === 'solid' ? css.solid : ''}`}
>
  <div class={css.container}>
    <div class={`${css.logo} ${menuOpen ? css.menuLogo : ''}`}>
      <a href="/"> andrea </a>
    </div>
    <nav class={css.navbar}>
      <ul class={`${css.navLinks} ${menuOpen ? css.active : ''}`}>
        <li class={css.link}><a href="/about">about</a></li>
        <li class={css.link}><a href="/photo">photo</a></li>
        <li class={css.link}><a href="/blog">blog</a></li>
      </ul>
      <button
        class={css.hamburger}
        on:click={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          <XIcon size="1.5x" class={css.closeIcon} />
        {:else}
          <MenuIcon size="1.5x" />
        {/if}
      </button>
    </nav>
  </div>
</header>
