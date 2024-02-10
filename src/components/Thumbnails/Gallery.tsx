import { Image } from 'astro:assets';
import type { GalleryPropsType, ImagePropsType } from './types';

import styles from './Gallery.module.scss';

const GalleryImage = ({ src, alt }: ImagePropsType) => (
  <>
    <Image
      class={styles.img}
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
        <a href={to}>
          <GalleryImage src={src} alt={alt} />
        </a>
      ) : (
        <div>
          <GalleryImage src={src} alt={alt} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
