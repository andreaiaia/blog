import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PolaroidPropsType, ImagePropsType } from '../types';

import styles from './Polaroid.module.scss';

const PolaroidImage = ({ src, alt }: ImagePropsType) => (
  <>
    <div className={styles.img}>
      <Image
        src={src}
        alt={alt || ''}
        fill
        sizes="(max-width: 768px) 300px,
                  500px"
      />
    </div>
    <div className={styles.title}>
      <p>{alt}</p>
    </div>
  </>
);

const Polaroid = ({ src, alt, cname, to }: PolaroidPropsType) => {
  return to ? (
    <Link
      className={`${styles.container} ${styles.link} ${cname || ''}`}
      href={to || '#'}
    >
      <PolaroidImage src={src} alt={alt} />
    </Link>
  ) : (
    <div className={`${styles.container} ${cname || ''}`}>
      <PolaroidImage src={src} alt={alt} />
    </div>
  );
};

export default Polaroid;
