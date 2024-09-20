<script>
  import { onMount } from 'svelte'
  import { MenuIcon, XIcon } from 'svelte-feather-icons'

  import css from './Navbar.module.scss'

  export let open
  export let handleMenu

  let pathname = ''

  const pages = [
    {
      name: 'Photo',
      href: '/photo'
    },
    {
      name: 'Dev',
      href: '/dev'
    },
    {
      name: 'Blog',
      href: '/blog'
    }
  ]

  onMount(() => {
    pathname = window.location.pathname
    const windowWidth = window.innerWidth

    open = windowWidth > 600

    const handleRouteChange = (event) => {
      pathname = event.detail.url
    }

    window.addEventListener('routechange', handleRouteChange)
    window.addEventListener('resize', () => {
      open = window.innerWidth > 600
    })

    return () => {
      window.removeEventListener('routechange', handleRouteChange)
    }
  })
</script>

<nav class={css.nav}>
  {#if open}
    <ul class={css.navLinks}>
      {#each pages as { name, href }}
        <li class={css.link}>
          <a {href} class={pathname === href ? css.active : ''}>
            {name}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
  <button on:click={() => handleMenu()}>
    <MenuIcon class={open ? `${css.menu} ${css.open}` : css.menu} size="30" />
    <XIcon class={open ? `${css.close} ${css.open}` : css.close} size="30" />
  </button>
</nav>
