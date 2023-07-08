import React from 'react';

import { getPostData } from '@lib/posts';
import { getSimilarPostsData } from '@lib/tags';

import Divider from '@components/Divider';
import { SimpleList } from '@components/PostsList';
import PostHero from '@components/Hero/PostHero';
import ProgressBar from '@components/ProgressBar';

import css from '../Blog.module.scss';

async function getData(slug: string) {
  const postData = await getPostData(slug);
  const similarPosts = await getSimilarPostsData(slug);

  return {
    postData,
    similarPosts,
  };
}

type PostProps = {
  params: {
    slug: string;
  };
};

/* <Head>
  <title>{`${data.title} - Andrea`}</title>
  <meta property="og:title" content={data.title} key="title" />
  <meta name="description" content={data.description} key="description" />
  <meta name="keywords" content={data.tags} />
  <meta name="author" content={data.author} />
  <meta property="og:description" content={data.description} />
  <meta property="og:title" content={data.title} />
</Head> */

const Post = async ({ params }: PostProps) => {
  const { postData, similarPosts } = await getData(params.slug);
  const { data, content, stats, formattedDate } = postData;

  return (
    <main>
      <ProgressBar />
      <div className={css.container}>
        <PostHero data={data} date={formattedDate} stats={stats} />
        <Divider />
        <article
          className={css.postContent}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <SimpleList posts={similarPosts} title="You may also like" />
      </div>
    </main>
  );
};

export default Post;
