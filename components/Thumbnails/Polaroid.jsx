import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Polaroid.module.scss';

const Polaroid = ({ src, alt, to, title }) => {
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
        <p className={styles.title}>{title}</p>
      </Link>
    </div>
  );
};

export default Polaroid;
