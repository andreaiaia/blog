<script>
  import { onMount } from 'svelte'
  import FullNav from './FullNav.svelte'
  import MobileNav from './MobileNav.svelte'

  let width = null

  onMount(() => {
    width = window.innerWidth

    const handleResize = () => {
      width = window.innerWidth
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
</script>

{#if width && width <= 600}
  <MobileNav />
{:else}
  <FullNav />
{/if}
