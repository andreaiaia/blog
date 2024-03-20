<script>
  import css from './PostHero.module.scss'
  import Tag from '../Tag/Tag.svelte'
  import PostMetadata from '../PostMetadata/PostMetadata.svelte'

  export let data
  export let date
  export let stats
</script>

<section class={css.hero}>
  <div class={css.postPic}>
    <img src={data.pic} alt={data.description} width="300" height="300" />
  </div>
  <div class={css.postData}>
    <div class={css.tags}>
      {#each data.tags as { tag }}
        <Tag to={`/tags#${tag}`} {tag} />
      {/each}
    </div>
    <div class={css.title}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
    <PostMetadata cname={css.metadata} {date} {stats} />
  </div>
</section>
