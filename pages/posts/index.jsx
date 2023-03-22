import React from 'react';
import { getSortedPostsData } from '../../lib/posts';

import { Post } from '../../components/Thumbnail/Post';

import styles from './Blog.module.scss';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Blog = ({ allPostsData }) => {
  return (
    <article className={styles.container}>
      <section className={styles.titleContainer}>
        <h1>Blog</h1>
      </section>
      <section className={styles.posts}>
        <ul>
          {allPostsData.map(
            ({ id, date, title, author, tag, description }, index) => (
              <li key={index}>
                <Post
                  id={id}
                  date={date}
                  title={title}
                  author={author}
                  tag={tag}
                  description={description}
                />
              </li>
            )
          )}
        </ul>
      </section>
    </article>
  );
};

export default Blog;
