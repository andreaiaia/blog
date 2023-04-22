import React from 'react';
import { getSortedPostsData } from '../../lib/posts';

import Post from '../../components/Thumbnails/Post';
import Hero from '../../components/Hero';

import styles from './Blog.module.scss';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Blog = ({ allPostsData }) => {
  return (
    <main>
      <Hero cname={styles.hero}>
        <div>
          <h1 className={styles.title}>Blog</h1>
          <p>My little corner of the web!</p>
        </div>
      </Hero>
      <section className={styles.container}>
        <ul className={styles.posts}>
          {allPostsData.map(
            (
              {
                id,
                formattedDate,
                title,
                author,
                tag,
                description,
                stats,
                pic,
              },
              index
            ) => (
              <li key={index}>
                <Post
                  id={id}
                  date={formattedDate}
                  title={title}
                  author={author}
                  tag={tag}
                  description={description}
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
