import React from 'react';
import Image from 'next/image';

import styles from './Polaroid.module.scss';

const Polaroid = ({ src, alt, cname }) => {
  return (
    <div className={`${styles.container} ${cname || ''}`}>
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
    </div>
  );
};

export default Polaroid;
