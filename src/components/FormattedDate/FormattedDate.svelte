<script lang="ts">
  export let date: Date;
  export let lang: string = 'it';
</script>

<time datetime={date.toISOString()}>
  {date.toLocaleDateString(lang === 'it' ? 'it-IT' : lang === 'en' ? 'en-US' : lang, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}
</time>
