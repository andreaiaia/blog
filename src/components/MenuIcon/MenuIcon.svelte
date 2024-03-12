<script>
  import { fly } from 'svelte-motion'
  import { onMount } from 'svelte'

  import css from './MenuIcon.module.scss'

  export let isOpen
  export let handler

  let transitionDuration = 300
  let transitionEasing = 'easeInOut'
  let pathProps = {}

  onMount(() => {
    pathProps = isOpen
      ? { d: 'M 3 2.5 L 17 16.346' }
      : { d: 'M 2 2.5 L 20 2.5' }

    return () => {
      pathProps = {} // Reset pathProps when component is destroyed
    }
  })
</script>

<button class={css.menuIcon} on:click={handler}>
  <svg>
    {#if isOpen}
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        {...pathProps}
      />
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        d="M 2 9.423 L 20 9.423"
        opacity="0"
      />
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        {...pathProps}
      />
    {:else}
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        {...pathProps}
      />
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        d="M 2 9.423 L 20 9.423"
        opacity="1"
      />
      <path
        in:fly={{ duration: transitionDuration, easing: transitionEasing }}
        {...pathProps}
      />
    {/if}
  </svg>
</button>

<style>
  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
