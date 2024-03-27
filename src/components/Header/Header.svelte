<script>
  import { onMount } from 'svelte'
  import Logo from '@components/Logo/Logo.svelte'
  import Navbar from './Navbar.svelte'

  import css from './Header.module.scss'

  let mounted = false
  let prevScroll = 0
  let headerStyle = css.header
  let open

  const handleMenu = () => {
    open = !open
  }

  const headerStyles = {
    top: `${css.header}`,
    hidden: `${css.header} ${css.hidden}`,
    visible: `${css.header} ${css.background}`
  }

  const handleScroll = () => {
    const currentScroll = window.scrollY

    if (currentScroll > prevScroll) headerStyle = headerStyles.hidden
    else if (currentScroll < 200) {
      headerStyle = headerStyles.top
      return
    } else headerStyle = headerStyles.visible

    prevScroll = currentScroll
  }

  onMount(() => {
    mounted = true
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
</script>

<header id="top" class={open ? `${headerStyle} ${css.open}` : `${headerStyle}`}>
  <div class={css.container}>
    <div class={css.logo}>
      <a href="/">
        <Logo />
      </a>
    </div>
    <Navbar {open} {handleMenu} />
    <!-- <div class={css.themeSwitcher}>
      <ThemeSwitcher />
    </div> -->
  </div>
</header>
