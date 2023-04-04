import React from 'react';
import Head from 'next/head';

import { getSortedPostsData } from '../lib/posts';

import Hero from '../components/Hero';
import Post from '../components/Thumbnails/Post';
import AlternateDiv from '../components/AlternateDiv';

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
        <section className={styles.alternateDivs}>
          <AlternateDiv
            img="/images/bio/me-2.jpg"
            imgAlt="A boring picture of me, Andrea"
            title="developer"
          >
            <p>
              I&apos;m an enthusiastic{' '}
              <span className={styles.accent}>front-end developer</span> from{' '}
              <span className={styles.accent}>Matera</span>, Italy.
            </p>
            <p>
              I refine the UX of the website of Credimi, a fintech based in
              Milan.
            </p>
          </AlternateDiv>
          <AlternateDiv
            img="/images/bio/me-3.jpg"
            imgAlt="A boring picture of me, Andrea"
            title="photography"
            right
          >
            <p>
              I love <span className={styles.accent}>photography</span>.
            </p>
            <p>When I&apos;m out shooting, I feel I&apos;m truly happy.</p>
          </AlternateDiv>
        </section>
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
