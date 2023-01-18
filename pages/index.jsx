import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { AtSign, FileText, Layout, Smartphone } from 'react-feather';

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
            width={400}
            height={400}
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
            Sono uno sviluppatore web Front-End, mi piace per il design semplice
            ed efficace.
          </p>
          <p> </p>
          <p>
            Studio informatica a Bologna e nel tempo libero scatto fotografie,
            lavoro a progetti personali oppure gioco a scacchi.
          </p>
        </div>
        <div className={styles.card}>
          <ul>
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
              <a href="#">
                <Layout /> andreabianchi.vercel.app
              </a>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
};

export default index;
