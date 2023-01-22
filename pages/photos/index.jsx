import React from 'react';

import Thumbnail from '../../components/Thumbnail';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <article className={styles.container}>
      <h1>Photo Gallery</h1>
      <section className={styles.thumbnails}>
        {data.map((item, index) => (
          <Thumbnail
            key={index}
            src={item.path + '/' + item.thumbnail}
            alt={item.description}
            to={'/photos/' + item.path.slice(15)}
            description={item.category}
          />
        ))}
      </section>
    </article>
  );
};

export default index;
