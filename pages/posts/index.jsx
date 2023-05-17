import React from 'react';

import { getSortedPostsData } from '/lib/posts';

import { Post } from '/components/Thumbnails';
import Hero from '/components/Hero';

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
      <section className={css.container}>
        <ul className={css.posts}>
          {allPostsData.map(
            ({ id, title, description, formattedDate, stats, pic }, index) => (
              <li key={index}>
                <Post
                  slug={id}
                  title={title}
                  description={description}
                  date={formattedDate}
                  stats={stats}
                  postPic={pic}
                />
              </li>
            )
          )}
        </ul>
      </section>
    </main>
  );
};

export default Blog;
