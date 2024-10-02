import React from 'react';
import Masonry from 'react-masonry-css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import css from './Gallery.module.scss';

const PhotoGallery = ({ images }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Gallery>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={css.masonryGrid}
          columnClassName={css.masonryGridColumn}
        >
          {images.map((image, index) => (
            <div key={index}>
              <Item
                original={image.srcset.w1024}
                thumbnail={image.srcset.w400}
                width="auto"
                height="auto"
              >
                {({ ref, open }) => (
                  <img
                    ref={ref}
                    onClick={() => open()}
                    src={image.srcset.w1024}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      cursor: 'pointer',
                      marginBottom: '10px',
                    }}
                  />
                )}
              </Item>
            </div>
          ))}
        </Masonry>
      </Gallery>
    </div>
  );
};

export { PhotoGallery };
