import React from 'react';

import styles from './Banner.module.scss';

const Banner = ({ title, text }) => {
  return (
    <section className={styles.banner}>
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default Banner;
