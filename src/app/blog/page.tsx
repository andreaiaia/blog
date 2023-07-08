import React from 'react';

import { getSortedPostsData } from '@lib/posts';
import { PostData } from '@lib/types';

import Hero from '@components/Hero';
import { SimpleList } from '@components/PostsList';

import css from './Blog.module.scss';

function getData() {
  const posts: PostData[] = getSortedPostsData();

  return posts;
}

const Blog = () => {
  const allPostsData = getData();

  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Blog</h1>
          <p>My little corner of the web!</p>
        </div>
      </Hero>
      <SimpleList posts={allPostsData} />
    </main>
  );
};

export default Blog;
