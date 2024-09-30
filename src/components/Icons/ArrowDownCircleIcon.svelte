<script>
  import { ArrowDownCircleIcon } from 'svelte-feather-icons';

  export let size = '24';
  export let addStyles = '';
</script>

<ArrowDownCircleIcon {size} class={addStyles} />
