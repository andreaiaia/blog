import React from 'react';

import { getSortedPostsData } from '/lib/posts';

import { Post } from '/components/Thumbnails';
import Hero from '/components/Hero';
import PostsList from '/components/PostsList';

import css from './Blog.module.scss';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();

  return {
    props: { allPostsData },
  };
}

const Blog = ({ allPostsData }) => {
  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Blog</h1>
          <p>My little corner of the web!</p>
        </div>
      </Hero>
      <PostsList posts={allPostsData} />
    </main>
  );
};

export default Blog;
