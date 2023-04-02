import React from 'react';
import Image from 'next/image';

import heroImg from '../../public/images/hero.webp';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <div className={styles.container}>
      <Image
        src={heroImg}
        alt="Moon at first quarter with enhanced colors"
        placeholder="blur"
        priority
      />
    </div>
  );
};

export default Hero;
