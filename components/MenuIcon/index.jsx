import React from 'react';
import { motion } from 'framer-motion';

import styles from './MenuIcon.module.scss';

const MenuIcon = ({ isOpen, handler }) => {
  const transition = { duration: 0.3, ease: 'easeInOut' };

  return (
    <button className={styles.menuIcon} onClick={handler}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
          transition={transition}
        />
        <motion.path
          d="M 2 9.423 L 20 9.423"
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={transition}
        />
        <motion.path
          animate={isOpen ? 'open' : 'closed'}
          initial={false}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
          transition={transition}
        />
      </svg>
    </button>
  );
};

export default MenuIcon;
