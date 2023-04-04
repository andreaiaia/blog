import React from 'react';
import Head from 'next/head';

import { getSortedPostsData } from '../lib/posts';

import Hero from '../components/Hero';
import Post from '../components/Thumbnails/Post';
import AlternateDivs from '../components/AlternateDivs';

import styles from '../styles/Home.module.scss';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Home = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>Home - Andrea</title>
        <meta property="og:title" content="homepage" key="title" />
      </Head>
      <main className={styles.container}>
        <Hero />
        <AlternateDivs />
        <section className={styles.recentPosts}>
          <h2>Latest posts</h2>
          <ul className={styles.posts}>
            {allPostsData.map(
              (
                { id, formattedDate, title, author, tag, description, stats },
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
                  />
                </li>
              )
            )}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Home;
