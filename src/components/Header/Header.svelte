<script>
  import { onMount } from 'svelte'
  import Logo from '@components/Logo/Logo.svelte'
  import Navbar from '@components/Navbar/Navbar.svelte'

  import css from './Header.module.scss'

  let mounted = false
  let prevScroll = 0
  let headerStyle = css.header

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

<header id="top" class={headerStyle}>
  <div class={css.container}>
    <div class={css.logo}>
      <a href="/">
        <Logo />
      </a>
    </div>
    <Navbar />
    <!-- <div class={css.themeSwitcher}>
      <ThemeSwitcher />
    </div> -->
  </div>
</header>
