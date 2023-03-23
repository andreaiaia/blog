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
    <main className={styles.container}>
      <h1>Blog</h1>
      <section>
        <ul className={styles.posts}>
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
    </main>
  );
};

export default Blog;
