import React from 'react';

import { Gallery } from '../../components/Thumbnail/Gallery';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <main className={styles.container}>
      <section className={styles.thumbnails}>
        {data.map((item, index) => (
          <Gallery
            key={index}
            src={item.path + item.thumbnail}
            alt={item.description}
            to={'/photos/' + item.category}
            title={item.title}
          />
        ))}
      </section>
    </main>
  );
};

export default index;
