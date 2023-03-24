import React from 'react';
import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts';

import Breadcrumbs from '../../components/Breadcrumbs';
import PostMetadata from '../../components/PostMetadata';

import styles from './Blog.module.scss';

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
    <>
      <Head>
        <title>{data.title} - Andrea</title>
        <meta property="og:title" content="homepage" key="title" />
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.tag} />
        <meta name="author" content={data.author} />
      </Head>
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
    </>
  );
};

export default Post;
