import React from 'react';
import Image from 'next/image';

import Hero from '../components/Hero';

import css from '../styles/Home.module.scss';
import pic from '../public/images/photos/blackandwhite/Matera-2021-5.webp';

const pageNotFound = () => {
  return (
    <main>
      <Hero background="tertiary" cname={css.pageNotFound}>
        <h1>
          404 <br /> page not found
        </h1>
        <div className={css.pageNotFoundPic}>
          <Image
            src={pic}
            alt="The Sassi of Matera in a double exposure with the clouds"
            placeholder="blur"
            fill
            sizes=""
          />
        </div>
      </Hero>
    </main>
  );
};

export default pageNotFound;
