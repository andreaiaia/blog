import React from 'react';
import Head from 'next/head';

import { getSortedPostsData } from '../lib/posts';

import { PostCard } from '../components/Thumbnails';
import { Polaroid } from '../components/Thumbnails';
import Hero from '../components/Hero';

import Matera from '../public/images/photos/matera/thumbnail.webp';
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
      <main>
        <Hero cname={styles.hero} background="transparent">
          <div className={styles.greetings}>
            <h1>Hello, my name is Andrea</h1>
            <p>
              I&apos;m a Front-End Developer from{' '}
              <span className={styles.accent}>Matera, Italy</span>
            </p>
          </div>
          <Polaroid cname={styles.pic} src={Matera} alt="My home, Matera" />
        </Hero>
        <section className={styles.recentPosts}>
          <div className={styles.title}>
            <h2>Latest posts</h2>
          </div>
          <div className={styles.postsContainer}>
            <ul className={styles.posts}>
              {allPostsData
                .slice(0, 3)
                .map(
                  (
                    { id, formattedDate, title, pic, tag, description, stats },
                    index
                  ) => (
                    <li key={index}>
                      <PostCard
                        id={id}
                        date={formattedDate}
                        title={title}
                        tag={tag}
                        description={description}
                        stats={stats}
                        postPic={pic}
                      />
                    </li>
                  )
                )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
