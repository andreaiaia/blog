import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, easeOut } from 'framer-motion';

import styles from './AlternateDivs.module.scss';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance], { ease: easeOut });
}

const Div = ({ img, imgAlt, title, children, right }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const distance = right ? -300 : 300;
  const x = useParallax(scrollYProgress, distance);

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={right ? `${styles.pic} ${styles.right}` : styles.pic}
        initial={
          right
            ? { transform: 'translateX(40%)' }
            : { transform: 'translateX(-40%)' }
        }
        whileInView={{ transform: 'translateX(0)' }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Image src={img} alt={imgAlt} width={300} height={300} priority />
      </motion.div>
      <div
        className={right ? `${styles.textDiv} ${styles.right}` : styles.textDiv}
        ref={ref}
      >
        <motion.h1
          style={{ x, transitionTimingFunction: 'easeOut' }}
          className={right ? `${styles.title} ${styles.right}` : styles.title}
        >
          {title}
        </motion.h1>
        <div
          className={
            right ? `${styles.description} ${styles.right}` : styles.description
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const AlternateDivs = ({ children }) => {
  return (
    <section className={styles.alternateDivs}>
      <Div
        img="/images/bio/me-2.jpg"
        imgAlt="A boring picture of me, Andrea"
        title="developer"
      >
        <p>
          I&apos;m an enthusiastic{' '}
          <span className={styles.accent}>front-end developer</span> from{' '}
          <span className={styles.accent}>Matera</span>, Italy.
        </p>
        <p>
          I refine the UX of the website of Credimi, a fintech based in Milan.
        </p>
      </Div>
      <Div
        img="/images/bio/me-3.jpg"
        imgAlt="A boring picture of me, Andrea"
        title="photography"
        right
      >
        <p>
          I love <span className={styles.accent}>photography</span>.
        </p>
        <p>When I&apos;m out shooting, I feel I&apos;m truly happy.</p>
      </Div>
    </section>
  );
};

export default AlternateDivs;
