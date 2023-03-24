import React from 'react';

import { getAllPostIds, getPostData } from '../../lib/posts';

import styles from './Blog.module.scss';

import Breadcrumbs from '../../components/Breadcrumbs';
import PostMetadata from '../../components/PostMetadata';

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

const Post = ({ postData }) => {
  const { data, content, stats, formattedDate } = postData;
  const tags = data.tag.split(', ');

  return (
    <main className={styles.container}>
      <Breadcrumbs />
      <PostMetadata
        cname={styles.metadata}
        date={formattedDate}
        stats={stats}
      />
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
