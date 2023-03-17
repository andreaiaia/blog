import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { getSortedPostsData } from '../lib/posts';
import { AtSign, Linkedin, Smartphone } from 'react-feather';

import { Post } from '../components/Thumbnail/Post';

import styles from '../styles/Home.module.scss';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}

const Home = ({ allPostsData }) => {
  const [profilePic, setProfilePic] = useState('/images/bio/me-1.jpg');

  useEffect(() => {
    const random = Math.floor(Math.random() * 4) + 1;
    setProfilePic(`/images/bio/me-${random}.jpg`);
  }, []);

  return (
    <>
      <Head>
        <title>Home - Andrea</title>
        <meta property="og:title" content="homepage" key="title" />
      </Head>
      <main className={styles.container}>
        <section className={styles.sectionTitle}>
          <div className={`${styles.card} ${styles.img}`}>
            <Image
              src={profilePic}
              alt="A boring picture of me, Andrea"
              width={300}
              height={300}
              priority
              className={styles.proPic}
            />
          </div>
          <div className={`${styles.card} ${styles.title}`}>
            <p className={styles.greetings}>Hi, I&apos;m</p>
            <h1 className={styles.name}>Andrea Bianchi</h1>
          </div>
        </section>
        <section className={styles.sectionBio}>
          <div className={`${styles.card} ${styles.textWall}`}>
            <p>
              I am a growing Junior{' '}
              <span className={styles.bold}>Front-End web developer</span>. I
              study Computer Science in Bologna, I am a big photography
              enthusiast and in my free time I like to learn new things by
              working on personal projects, or relaxing with video games or
              chess.
            </p>
          </div>
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
      </main>
    </>
  );
};

export default Home;
