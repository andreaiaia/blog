import { Image } from 'astro:assets';
import type { PolaroidPropsType, ImagePropsType } from './types';

import styles from './Polaroid.module.scss';

const PolaroidImage = ({ src, alt }: ImagePropsType) => (
  <>
    <div className={styles.img}>
      <Image
        src={src}
        alt={alt || ''}
        width={300}
        height={300}
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
    <a
      className={`${styles.container} ${styles.link} ${cname || ''}`}
      href={to || '#'}
    >
      <PolaroidImage src={src} alt={alt} />
    </a>
  ) : (
    <div className={`${styles.container} ${cname || ''}`}>
      <PolaroidImage src={src} alt={alt} />
    </div>
  );
};

export default Polaroid;
