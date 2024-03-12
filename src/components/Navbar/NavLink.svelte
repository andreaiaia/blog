<script>
  import { onMount } from 'svelte'

  import css from './NavItems.module.scss'

  export let href
  export let onClick
  export let children

  let pathname = ''

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

  let isActive = pathname === href
</script>

<li class={css.link}>
  <a {href} on:click={onClick} class={isActive ? css.active : ''}>
    {children}
  </a>
</li>
