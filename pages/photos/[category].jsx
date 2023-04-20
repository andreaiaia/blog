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
  const data = photoData.data.filter((item) => item.category === category)[0];

  if (data)
    return (
      <main className={styles.main}>
        <section className={styles.title}>
          <div>
            <h1>{data.title}</h1>
            <Link href="/photos" className={styles.backlink}>
              Back to Photos
            </Link>
          </div>
          <p>{data.description}</p>
        </section>
        <section className={styles.gallery}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 700: 2, 1200: 3 }}
          >
            <Masonry gutter="1rem">
              {data.photos.map((photo, index) => {
                const url = data.path + photo.filepath;

                return <Photo key={index} url={url} photo={photo} />;
              })}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      </main>
    );

  return null;
};

export default Category;
