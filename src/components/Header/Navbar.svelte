<script>
  import { onMount } from 'svelte'
  import { MenuIcon, XIcon } from 'svelte-feather-icons'

  import css from './Navbar.module.scss'

  let pathname = ''

  const pages = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Photos',
      href: '/photos'
    },
    {
      name: 'Blog',
      href: '/blog'
    }
  ]

  let open = true

  const handleMenu = () => {
    open = !open
    console.log('clicked')
  }

  onMount(() => {
    pathname = window.location.pathname

    const handleRouteChange = (event) => {
      pathname = event.detail.url
    }

    window.addEventListener('routechange', handleRouteChange)

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
