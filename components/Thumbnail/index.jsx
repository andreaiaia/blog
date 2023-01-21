import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Thumbnail.module.scss';

const Thumbnail = ({ src, alt, to, description }) => {
  return (
    <div className={styles.container}>
      <Link href={to}>
        <a>
          <Image
            className={styles.img}
            src={src}
            alt={alt || ''}
            width={300}
            height={300}
          />
          <span className={styles.description}>{description}</span>
        </a>
      </Link>
    </div>
  );
};

export default Thumbnail;
