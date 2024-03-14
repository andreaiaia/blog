<script>
  import { onMount } from 'svelte'

  import css from './NavItems.module.scss'

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

<ul class={css.navLinks}>
  {#each pages as { name, href }, index}
    <li class={css.link}>
      <a {href} class={pathname === href ? css.active : ''}>
        {name}
      </a>
    </li>
  {/each}
</ul>
