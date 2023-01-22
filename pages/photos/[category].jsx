import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const data = photoData.data.filter(
    (item) => item.path === '/images/photos/' + category
  )[0];

  console.log(data);

  if (data)
    return (
      <article className={styles.container}>
        <h1>{data.category}</h1>
        <p>{data.description}</p>
        <section className={styles.gallery}>
          {data.photos.map((photo, index) => {
            const url = data.path + '/' + photo.filename;
            let size = '';

            return (
              <div className={styles.img}>
                <Image
                  key={index}
                  src={url}
                  alt={photo.description}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            );
          })}
        </section>
      </article>
    );

  return null;
};

export default Category;
