import React from 'react';
import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';

import styles from './Blog.module.scss';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Post = ({ id, date, title, author, tag, description }) => {
  return (
    <>
      <Link href={`/posts/${id}`}>
        <a>{title}</a>
      </Link>
      <p>{date}</p>
      <p>{author}</p>
      <p>{tag}</p>
      <p>{description}</p>
    </>
  );
};

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
