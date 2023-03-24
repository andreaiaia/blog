import React from 'react';
import readingTime from 'reading-time';

import { getAllPostIds, getPostData } from '../../lib/posts';

import styles from './Blog.module.scss';
import Breadcrumbs from '../../components/Breadcrumbs';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

const Post = ({ postData }) => {
  const { data, content } = postData;
  const formattedDate = formatDate(data.date);
  const tags = data.tag.split(', ');
  const stats = readingTime(content);
  console.log(stats);

  return (
    <main className={styles.container}>
      <Breadcrumbs />
      <div className={styles.meta}>
        <p>{formattedDate}</p>
        <p className={styles.readingtime}>{stats.text}</p>
        <p>{stats.words} words</p>
      </div>
      <div className={styles.title}>
        <h1>{data.title}</h1>
      </div>
      <div className={styles.tags}>
        {tags.map((tag, index) => {
          return (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          );
        })}
      </div>
      <article
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
};

export default Post;
