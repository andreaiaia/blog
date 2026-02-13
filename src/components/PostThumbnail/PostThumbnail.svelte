<script lang="ts">
  import FormattedDate from '../FormattedDate/FormattedDate.svelte';
  import css from './PostThumbnail.module.scss';
  import CFImage from '../CFImage/CFImage.svelte';

  export let post: {
    id: string;
    data: {
      title: string;
      description: string;
      date: Date;
      image: string;
      lang?: string; // aggiunto per multilingua
    };
  };

  // Variabile per gestire la lingua del post
  export let lang: string = post.data.lang ?? 'it';
</script>

<div class={css.article}>
  <div class={css.container}>
    <div class={css.head}>
      <div class={css.date}>
        <FormattedDate date={post.data.date} {lang} />
      </div>
      <a
        class={css.image}
        href={`${lang !== 'it' ? `/${lang}` : ''}/blog/${post.id}`}
      >
        <CFImage src={post.data.image} alt={post.data.title} />
      </a>
    </div>
    <div class={css.content}>
      <h2 class={css.title}>
        <a href={`${lang !== 'it' ? `/${lang}` : ''}/blog/${post.id}`}
          >{post.data.title}</a
        >
      </h2>
      <p class={css.description}>{post.data.description}</p>
    </div>
  </div>
</div>
