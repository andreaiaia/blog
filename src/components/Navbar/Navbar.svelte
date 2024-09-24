<script>
  import css from './Navbar.module.scss'

  let menuOpen = false

  function toggleMenu() {
    menuOpen = !menuOpen
    console.log(menuOpen)
  }
</script>

<nav class={css.navbar}>
  <ul class={`${css.navLinks} ${menuOpen ? css.active : ''}`}>
    <li class={css.link}><a href="/about">about</a></li>
    <li class={css.link}><a href="/photo">photo</a></li>
    <li class={css.link}><a href="/blog">blog</a></li>
  </ul>
  <div class={css.hamburger} on:click={toggleMenu}>
    <div class={`${css.line} ${menuOpen ? css.change : ''}`}></div>
    <div class={`${css.line} ${menuOpen ? css.change : ''}`}></div>
    <div class={`${css.line} ${menuOpen ? css.change : ''}`}></div>
  </div>
</nav>
