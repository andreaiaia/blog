import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

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
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2 }}>
            <Masonry gutter="1rem">
              {data.photos.map((photo, index) => {
                const url = data.path + '/' + photo.filename;

                return (
                  <Image
                    key={index}
                    src={url}
                    alt={photo.description}
                    width={photo.width}
                    height={photo.height}
                  />
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      </article>
    );

  return null;
};

export default Category;
