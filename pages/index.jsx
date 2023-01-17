import React from 'react';
import Image from 'next/image';

import styles from '../styles/Home.module.scss';

const index = () => {
  return (
    <article className={styles.container}>
      <section>
        <Image
          src="/images/bio/me-1.jpg"
          alt="A boring picture of me, Andrea"
          width={200}
          height={200}
          priority
          className={styles.proPic}
        />
        <h1 className={styles.title}>Hi, I'm Andrea Bianchi</h1>
        <p>This is my home</p>
      </section>
    </article>
  );
};

export default index;
