import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { FileText } from 'react-feather';

import styles from '../styles/Home.module.scss';

const index = () => {
  const [profilePic, setProfilePic] = useState('/images/bio/me-1.jpg');

  useEffect(() => {
    const random = Math.floor(Math.random() * 4) + 1;
    setProfilePic(`/images/bio/me-${random}.jpg`);
  }, []);

  return (
    <article className={styles.container}>
      <section className={styles.sectionBio}>
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
          <div>
            <p className={styles.greetings}>Hi, I'm</p>
            <h1 className={styles.title}>Andrea Bianchi</h1>
            <button className={styles.download}>
              <FileText /> Download CV
            </button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default index;
