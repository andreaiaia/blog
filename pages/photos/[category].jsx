import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import Banner from '../../components/Banner';
import photoData from './photos-index.json';

import css from './Photos.module.scss';

const Photo = ({ url, photo }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className={css.img} onClick={() => setIsVisible(!isVisible)}>
        <Image
          src={url}
          alt={photo.description}
          width={photo.width}
          height={photo.height}
        />
        <div
          className={
            isVisible
              ? `${css.photoDescription} ${css.show}`
              : `${css.photoDescription} ${css.hide}`
          }
        >
          <p className={css.picTitle}>{photo.title}</p>
          <p>{photo.description}</p>
        </div>
      </div>
    </div>
  );
};

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const data = photoData.data.filter((item) => item.category === category)[0];

  if (data)
    return (
      <main>
        <Banner title={data.title} text={data.description} />
        <section className={css.gallery}>
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 700: 2, 1200: 3 }}
          >
            <Masonry gutter="1rem">
              {data.photos.map((photo, index) => {
                const url = data.path + photo.filepath;

                return <Photo key={index} url={url} photo={photo} />;
              })}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      </main>
    );

  return null;
};

export default Category;
