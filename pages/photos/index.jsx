import React from 'react';

import Thumbnail from '../../components/Thumbnail';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <article className={styles.container}>
      <section className={styles.titleContainer}>
        <h1>Photo Gallery</h1>
      </section>
      <section className={styles.thumbnails}>
        {data.map((item, index) => (
          <Thumbnail
            key={index}
            src={item.path + item.thumbnail}
            alt={item.description}
            to={'/photos/' + item.category}
            title={item.title}
          />
        ))}
      </section>
    </article>
  );
};

export default index;
