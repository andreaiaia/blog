<script lang="ts">
  import { formatDate } from '../../utils/formatDate'
  import css from './PostThumbnail.module.scss'

  export let post: {
    slug: string
    data: {
      title: string
      description: string
      date: Date
      image: string
    }
  }
</script>

<div class={css.article}>
  <div class={css.container}>
    <div class={css.head}>
      <time class={css.date} datetime={post.data.date.toISOString()}
        >{formatDate(post.data.date)}
      </time>
      <a class={css.image} href={`/blog/${post.slug}`}>
        <img src={post.data.image} alt={post.data.title} />
      </a>
    </div>
    <div class={css.content}>
      <h2 class={css.title}>
        <a href={`/blog/${post.slug}`}>{post.data.title}</a>
      </h2>
      <p class={css.description}>{post.data.description}</p>
    </div>
  </div>
</div>
