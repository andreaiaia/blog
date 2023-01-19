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
        <div className={`${styles.card} ${styles.basics}`}>
          <Image
            src="/images/skills/html-css-js.png"
            alt="The HTML, CSS and Javascript logos"
            width={300}
            height={200}
          />
          <p>
            Knows <span className={styles.accent}>HTML, CSS</span> and{' '}
            <span className={styles.accent}>Javascript</span>
          </p>
        </div>
        <div className={`${styles.card} ${styles.docker}`}>
          <Image
            src="/images/skills/docker.png"
            alt="Docker logo"
            width={300}
            height={200}
          />
          <p>
            Fights the chaos with <span>Docker</span>
          </p>
        </div>
        <div className={`${styles.card} ${styles.react}`}>
          <Image
            src="/images/skills/react.png"
            alt="ReactJS logo"
            width={400}
            height={400}
          />
          <p>
            Enjoys <span>ReactJS</span>
          </p>
        </div>
        <div className={`${styles.card} ${styles.exp}`}>
          <h2>Esperienza lavorativa</h2>
          <div>
            <h3>Credimi S.p.A.</h3>
            <h4>Febbraio 2022 - Presente</h4>
            <ul>
              <li>
                Sviluppo del sito pubblico come parte del team Acquisition;
              </li>
              <li>
                Sviluppo del widget antifrode come parte del team internal.
              </li>
            </ul>
          </div>
        </div>
        <div className={`${styles.card} ${styles.graphql}`}>
          <p>Asks questions</p>
          <Image
            src="/images/skills/graphql.png"
            alt="The GraphQL Logo"
            width={80}
            height={80}
          />
          <p>
            with <span>GraphQL</span>
          </p>
        </div>
        <div className={`${styles.card} ${styles.ts}`}>
          <p>
            &#129293; In love with <span>Typescript</span>
          </p>
        </div>
        <div className={`${styles.card} ${styles.postgres}`}>
          <p>
            Stays tidy with <span>PostgreSQL</span>
          </p>
          <Image
            src="/images/skills/postgres.png"
            alt="PostgreSQL Logo"
            width={300}
            height={200}
          />
        </div>
      </section>
    </article>
  );
};

export default index;
