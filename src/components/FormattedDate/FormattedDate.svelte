<script lang="ts">
  export let date: Date;
</script>

<time datetime={date.toISOString()}>
  {date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}
</time>
