import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Gallery.module.scss';

const Gallery = ({ src, alt, to, title }) => {
  return (
    <div className={styles.container}>
      <Link href={to}>
        <Image
          className={styles.img}
          src={src}
          alt={alt || ''}
          width={350}
          height={350}
        />
        <span className={styles.title}>{title}</span>
      </Link>
    </div>
  );
};

export default Gallery;
