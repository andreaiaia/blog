<script>
  import css from './PostMetadata.module.scss'

  export let cname
  export let date
  export let stats
</script>

<div class={`${css.meta} ${cname}`}>
  <p>{date}</p>
  <p class={css.readingtime}>{stats.text}</p>
  <p>{stats.words} words</p>
</div>
