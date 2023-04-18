import React from 'react';
import Link from 'next/link';

import { Polaroid } from '../../components/Thumbnails';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <main className={styles.container}>
      <section className={styles.thumbnails}>
        {data.map((item, index) => (
          <Link key={index} href={'/photos/' + item.category}>
            <Polaroid src={item.path + item.thumbnail} alt={item.title} />
          </Link>
        ))}
      </section>
    </main>
  );
};

export default index;
