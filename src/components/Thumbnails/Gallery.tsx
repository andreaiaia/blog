import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryPropsType, ImagePropsType } from '../types';

import styles from './Gallery.module.scss';

const GalleryImage = ({ src, alt }: ImagePropsType) => (
  <>
    <Image
      className={styles.img}
      src={src}
      alt={alt || ''}
      width={350}
      height={350}
    />
    <span className={styles.title}>{alt}</span>
  </>
);

const Gallery = ({ src, alt, to }: GalleryPropsType) => {
  return (
    <div className={styles.container}>
      {to ? (
        <Link href={to}>
          <GalleryImage src={src} alt={alt} />
        </Link>
      ) : (
        <div>
          <GalleryImage src={src} alt={alt} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
