import React from 'react';

import { Polaroid } from '../../components/Thumbnails';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <main className={styles.container}>
      <section className={styles.thumbnails}>
        {data.map((item, index) => (
          <Polaroid
            key={index}
            src={item.path + item.thumbnail}
            alt={item.title}
            to={'/photos/' + item.category}
          />
        ))}
      </section>
    </main>
  );
};

export default index;
