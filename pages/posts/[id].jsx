import React from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring } from 'framer-motion';

import { getAllPostIds, getPostData } from '../../lib/posts';

import Breadcrumbs from '../../components/Breadcrumbs';
import PostMetadata from '../../components/PostMetadata';

import styles from './Blog.module.scss';
import PostHero from '../../components/Hero/PostHero';

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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Head>
        <title>{`${data.title} - Andrea`}</title>
        <meta property="og:title" content={data.title} key="title" />
        <meta name="description" content={data.description} key="description" />
        <meta name="keywords" content={data.tag} />
        <meta name="author" content={data.author} />
        <meta property="og:description" content={data.description} />
        <meta property="og:title" content={data.title} />
      </Head>
      <main className={styles.main}>
        <motion.div className={styles.progressBar} style={{ scaleX }} />
        <div className={styles.container}>
          <PostHero data={data} date={formattedDate} stats={stats} />
          <hr className={styles.separator} />
          <article
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
    </>
  );
};

export default Post;
