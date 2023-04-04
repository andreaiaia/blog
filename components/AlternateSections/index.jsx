import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, easeOut } from 'framer-motion';

import styles from './AlternateSections.module.scss';

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance], { ease: easeOut });
}

const AlternateSections = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useParallax(scrollYProgress, 300);

  return (
    <section className={styles.sectionGreetings}>
      <div className={styles.developer}>
        <motion.div
          className={styles.proPic}
          initial={{ transform: 'translateX(-40%)' }}
          whileInView={{ transform: 'translateX(0)' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src="/images/bio/me-2.jpg"
            alt="A boring picture of me, Andrea"
            width={300}
            height={300}
            priority
          />
        </motion.div>
        <div className={styles.texts} ref={ref}>
          <motion.h1 style={{ x, transitionTimingFunction: 'easeOut' }}>
            developer
          </motion.h1>
          <motion.div className={styles.description}>
            <p>
              I&apos;m an enthusiastic{' '}
              <span className={styles.accent}>front-end developer</span> from{' '}
              <span className={styles.accent}>Matera</span>, Italy.
            </p>
            <p>
              I refine the UX of the website of Credimi, a fintech based in
              Milan.
            </p>
          </motion.div>
        </div>
      </div>
      <div className={styles.photographer}>
        <div className={styles.texts}>
          <h1>photography</h1>
          <motion.div
            className={styles.description}
            initial={{ transform: 'translateX(-40%)' }}
            whileInView={{ transform: 'translateX(0)' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p>
              I love <span className={styles.accent}>photography</span>.
            </p>
            <p>When I&apos;m out shooting, I feel I&apos;m truly happy.</p>
          </motion.div>
        </div>
        <motion.div
          className={styles.photoPic}
          initial={{ transform: 'translateX(40%)' }}
          whileInView={{ transform: 'translateX(0)' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Image
            src="/images/bio/me-3.jpg"
            alt="A boring picture of me, Andrea"
            width={300}
            height={300}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AlternateSections;
