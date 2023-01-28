import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import photoData from './photos-index.json';

import styles from './Photos.module.scss';

const Photo = ({ url, photo }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className={styles.img} onClick={() => setIsVisible(!isVisible)}>
        <Image
          src={url}
          alt={photo.description}
          width={photo.width}
          height={photo.height}
        />
        <div
          className={
            isVisible
              ? `${styles.photoDescription} ${styles.show}`
              : `${styles.photoDescription} ${styles.hide}`
          }
        >
          <p className={styles.picTitle}>{photo.title}</p>
          <p>{photo.description}</p>
        </div>
      </div>
    </div>
  );
};

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
        <section className={styles.titleContainer}>
          <div className={styles.title}>
            <h1>{data.category}</h1>
            <Link href="/photos">
              <a className={styles.backlink}>Back to Photos</a>
            </Link>
          </div>
          <p>{data.description}</p>
        </section>
        <section className={styles.gallery}>
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2 }}>
            <Masonry gutter="1rem">
              {data.photos.map((photo, index) => {
                const url = data.path + '/' + photo.filename;

                return <Photo key={index} url={url} photo={photo} />;
              })}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      </article>
    );

  return null;
};

export default Category;
