import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { getSortedPostsData } from '../lib/posts';
import { AtSign, Linkedin, Smartphone } from 'react-feather';

import Hero from '../components/Hero';
import Post from '../components/Thumbnails/Post';

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
        <section className={styles.sectionGreetings}>
          <div className={styles.developer}>
            <Image
              src="/images/bio/me-2.jpg"
              alt="A boring picture of me, Andrea"
              width={300}
              height={300}
              priority
              className={styles.proPic}
            />
            <div>
              <h1>developer</h1>
              <div className={styles.description}>
                <p>
                  I&apos;m an enthusiastic{' '}
                  <span className={styles.accent}>front-end developer</span>{' '}
                  from <span className={styles.accent}>Matera</span>, Italy.
                </p>
                <p>
                  I refine the UX of the website of Credimi, a fintech based in
                  Milan.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.photographer}>
            <Image
              src="/images/bio/me-3.jpg"
              alt="A boring picture of me, Andrea"
              width={300}
              height={300}
              priority
              className={styles.photoPic}
            />
            <div>
              <h1>photographer</h1>
              <div className={styles.description}>
                <p>
                  I love <span className={styles.accent}>photography</span>.
                </p>
                <p>When I&apos;m out shooting, I feel I&apos;m truly happy.</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.sectionBio}>
          <div className={`${styles.card} ${styles.contactsContainer}`}>
            <ul className={styles.contacts}>
              <li>
                <a href="mailto:bianan96@gmail.com">
                  <AtSign /> bianan96@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+39 351 710 58 75">
                  <Smartphone /> +39 351 710 58 75
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/andreaiaia/">
                  <Linkedin /> linkedin.com/in/andreaiaia
                </a>
              </li>
            </ul>
          </div>
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
