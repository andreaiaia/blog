import React from 'react';
import Image from 'next/image';

import Hero from '../components/Hero';

import css from '../styles/PageNotFound.module.scss';
import pic from '../public/images/photos/blackandwhite/Matera-2021-5.webp';

const pageNotFound = () => {
  return (
    <main>
      <Hero cname={css.pageNotFound}>
        <div className={css.title}>
          <p>404</p>
          <h1>Page not found</h1>
        </div>
        <div className={css.pageNotFoundPic}>
          <Image
            src={pic}
            alt="The Sassi of Matera in a double exposure with the clouds"
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 300px,
                  500px"
          />
        </div>
      </Hero>
    </main>
  );
};

export default pageNotFound;
