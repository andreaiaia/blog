<script>
  import css from './PostThumbnail.module.scss'
  // import PostMetadata from '../PostMetadata/PostMetadata.svelte'

  export let post = {}
</script>

<a class={css.container} href={`/blog/${post.slug}`}>
  <div class={css.image}>
    <img src={post.data.image} alt={post.data.title} />
    <div class={css.metadata}>
      <!-- <PostMetadata cname={css.meta} date={post.data.date} /> -->
    </div>
  </div>
  <div class={css.content}>
    <p class={css.title}>{post.data.title}</p>
    <p class={css.description}>{post.data.description}</p>
  </div>
</a>
