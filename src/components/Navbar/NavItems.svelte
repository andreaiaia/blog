<script>
  import { onMount } from 'svelte'
  import NavLink from './NavLink.svelte'
  import css from './NavItems.module.scss'

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

  export let menuHandler

  onMount(() => {
    // Perform any necessary actions on component mount
    console.log('Component mounted')
  })
</script>

<ul class={css.navLinks}>
  {#each pages as { name, href }, index}
    <NavLink key={index} {href} on:click={menuHandler}>
      {name}
    </NavLink>
  {/each}
</ul>
