import React from 'react';

import { Polaroid } from '@components/Thumbnails';
import Hero from '@components/Hero';

import photoData from './photos-index.json';

import css from './Photos.module.scss';

const index = () => {
  const data = photoData.data;

  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Photos</h1>
          <p>Have a look at my pictures!</p>
        </div>
      </Hero>
      <section className={css.container}>
        {data.map((item, index) => (
          <Polaroid
            key={index}
            src={item.path + item.thumbnail}
            alt={item.title}
            to={'/photos/' + item.category}
          />
        ))}
      </section>
    </main>
  );
};

export default index;
