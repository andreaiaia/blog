import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Polaroid.module.scss';

const Polaroid = ({ src, alt, to, title }) => {
  return (
    <figure className={styles.container}>
      <Link href={to}>
        <Image
          className={styles.img}
          src={src}
          alt={alt || ''}
          width={350}
          height={350}
        />
        <figcaption className={styles.title}>{title}</figcaption>
      </Link>
    </figure>
  );
};

export default Polaroid;
