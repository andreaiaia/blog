import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { AtSign, FileText, Linkedin, Smartphone } from 'react-feather';

import styles from '../styles/Home.module.scss';

const index = () => {
  const [profilePic, setProfilePic] = useState('/images/bio/me-1.jpg');

  useEffect(() => {
    const random = Math.floor(Math.random() * 4) + 1;
    setProfilePic(`/images/bio/me-${random}.jpg`);
  }, []);

  const renderCV = () => {
    console.log('write me!');
  };

  return (
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
        <div className={styles.card}>
          <p className={styles.greetings}>Hi, I'm</p>
          <h1 className={styles.title}>Andrea Bianchi</h1>
          <button className={styles.download} onClick={renderCV}>
            <FileText />
            Download CV
          </button>
        </div>
      </section>
      <section className={styles.sectionBio}>
        <div className={`${styles.card} ${styles.textWall}`}>
          <p>
            Sono uno{' '}
            <span className={styles.bold}>sviluppatore web Front-End</span>, mi
            piace per il design semplice ed efficace.
          </p>
          <p> </p>
          <p>
            Studio informatica a Bologna e nel tempo libero scatto fotografie,
            lavoro a progetti personali oppure gioco a scacchi.
          </p>
        </div>
        <div className={`${styles.card} ${styles.bgImg}`}>
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
          <h2>Esperienza lavorativa</h2>
          <div>
            <h3>
              Credimi S.p.A. <span>Feb 2022 - Present</span>
            </h3>
            <p>
              Sviluppo del sito pubblico come parte del team Acquisition;
              Sviluppo del widget antifrode come parte del team internal.
            </p>
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
            &#129293; In love with <span>Typescript</span>
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
          <h2>Istruzione</h2>
          <div>
            <h3>
              Laurea in Scienze della Comunicazione <span>Nov 2019</span>
            </h3>
            <p>
              I got my degree in Communication Science at the University of
              Bologna with a thesis about the AI Generated Art (before DALL·E
              made drove crazy about it).
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
              As you might have guessed, I really like photography: I started
              when I was 16 and I enjoy taking pictures for myself, I also print
              them in posters or books. Wherever I go I make sure I have my
              loved Fujifilm X-T3 with me.
            </p>
          </div>
          <div>
            <h3>Opt Out Podcast</h3>
            <p>
              I made a one season podcast about privacy and online security; the
              goal was to explain in the easiest way possible the basic concepts
              for a broad audience. The podcast is in Italian and avialable on
              Spotify and other platforms.
            </p>
          </div>
        </div>
      </section>
      <button className={styles.downloadBig} onClick={renderCV}>
        <FileText />
        Download CV
      </button>
    </article>
  );
};

export default index;
