'use client';
import { motion, useScroll, useSpring } from 'framer-motion';

import css from './ProgressBar.module.scss';

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className={css.progressBar} style={{ scaleX }} />;
};

export default ProgressBar;
