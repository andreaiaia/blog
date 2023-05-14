import React from 'react';
import Head from 'next/head';
import { motion, useScroll, useSpring } from 'framer-motion';

import { getAllPostIds, getPostData } from '../../lib/posts';
import { getSimilarPostsData } from '../../lib/tags';
import { getAllPosts } from '../../lib/notion';
import { renderPage } from '../../lib/notionBlockRenderer';

import Divider from '../../components/Divider';
import SimilarPosts from '../../components/SimilarPosts';

import styles from './Blog.module.scss';
import PostHero from '../../components/Hero/PostHero';

import { databaseId } from '../index.jsx';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const similarPosts = await getSimilarPostsData(params.id);

  // use the function in notion.js to get the data from the database
  const allPosts = await getAllPosts(databaseId);

  // in allPosts find the post with slug equals to params.id
  const post = allPosts.find((post) => post.slug === params.id);

  const article = renderPage(post.content);
  console.log(article);

  return {
    props: {
      postData,
      similarPosts,
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

const Post = ({ postData, similarPosts }) => {
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
      <main>
        <motion.div className={styles.progressBar} style={{ scaleX }} />
        <div className={styles.container}>
          <PostHero data={data} date={formattedDate} stats={stats} />
          <Divider />
          <article
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <SimilarPosts similarPostsData={similarPosts} />
        </div>
      </main>
    </>
  );
};

export default Post;
