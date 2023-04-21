import React from 'react';

import { Polaroid } from '../../components/Thumbnails';
import Banner from '../../components/Banner';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <main>
      <Banner title="Photos" text="Have a look at my pictures!" />
      <section className={styles.container}>
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
