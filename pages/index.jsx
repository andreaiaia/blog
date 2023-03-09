import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { AtSign, FileText, Linkedin, Smartphone } from 'react-feather';

import styles from '../styles/Home.module.scss';

const Home = () => {
  const [profilePic, setProfilePic] = useState('/images/bio/me-1.jpg');

  useEffect(() => {
    const random = Math.floor(Math.random() * 4) + 1;
    setProfilePic(`/images/bio/me-${random}.jpg`);
  }, []);

  const renderCV = () => {
    window.print();
    // Consider this library
    // https://thewebdev.info/2021/05/30/how-to-generate-a-pdf-file-from-react-components/
    // https://w3collective.com/react-component-pdf/
  };

  return (
    <>
      <Head>
        <title>About Andrea</title>
        <meta property="og:title" content="About Andrea" key="title" />
      </Head>
      <article className={styles.container}>
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
            <button className={styles.download} onClick={renderCV}>
              <FileText />
              Download CV
            </button>
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
        <section className={styles.sectionSkills}>
          <div className={`${styles.card} ${styles.exp}`}>
            <h2>Job Experience</h2>
            <div>
              <h3>
                Credimi S.p.A. <span>Feb 2022 - Present</span>
              </h3>
              <ul className={styles.list}>
                <li>
                  Public website developer as part of the Acquisition team.
                </li>
                <li>
                  Anti-fraud widget developer as part of the internal team.
                </li>
                <li>
                  Technologies used: React, Gatsby, Typescript, SCSS, GraphQL
                  and Apollo.
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.card} ${styles.basics}`}>
            <p>
              Knows <span>HTML, CSS</span>
            </p>

            <p>
              and <span>Javascript</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.react}`}>
            <p>
              Enjoys <span>ReactJS</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.ts}`}>
            <p>
              In love with <span>Typescript</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.docker}`}>
            <p>
              Fights the chaos with <span>Docker</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.graphql}`}>
            <p>Asks questions</p>
            <p>
              with <span>GraphQL</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.postgres}`}>
            <p>
              Stays tidy with <span>PostgreSQL</span>
            </p>
          </div>
          <div className={`${styles.card} ${styles.edu}`}>
            <h2>Education</h2>
            <div>
              <h3>
                Communication Science Degree <span>Nov 2019</span>
              </h3>
              <p>
                I graduated in Communication Science at the University of
                Bologna with a thesis on AI-generated art.
              </p>
            </div>
          </div>
        </section>
        <section className={styles.sectionMore}>
          <div className={`${styles.card} ${styles.hobbies}`}>
            <h2>Hobbies</h2>
            <div>
              <h3>Photography</h3>
              <p>
                Photography is my passion: I started taking pictures at the age
                of 16 and I love capturing moments and printing them in posters
                or books. Wherever I go, I make sure to have my beloved Fujifilm
                camera with me.
              </p>
            </div>
            <div>
              <h3>Opt Out Podcast</h3>
              <p>
                I made a one-season podcast on privacy and online security, with
                the goal of making it easily understandable for a broad
                audience. The podcast is in Italian and available on multiple
                platforms.
              </p>
            </div>
          </div>
        </section>
        <button className={styles.downloadBig} onClick={renderCV}>
          <FileText />
          Download CV
        </button>
      </article>
    </>
  );
};

export default Home;
