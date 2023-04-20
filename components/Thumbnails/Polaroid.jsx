import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Polaroid.module.scss';

const PolaroidImage = ({ src, alt }) => (
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

const Polaroid = ({ src, alt, cname, to }) => {
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
