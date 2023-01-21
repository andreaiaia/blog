import React from 'react';

import Thumbnail from '../../components/Thumbnail';

import styles from './Photos.module.scss';

const index = () => {
  return (
    <article className={styles.container}>
      <h1>Photo Gallery</h1>
      <section className={styles.group}>
        <Thumbnail
          src="/images/photos/Astro/thumbnail.webp"
          alt="View my pictures of the deep sky"
          to="/photos/Astrophotography"
          description="astrophotography"
        />
      </section>
    </article>
  );
};

export default index;
