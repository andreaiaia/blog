import React from 'react';
import { motion } from 'framer-motion';

const MenuIcon = ({ isOpen }) => {
  const transition = { duration: 0.3, ease: 'easeInOut' };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <motion.path
        animate={isOpen ? 'open' : 'closed'}
        initial={false}
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5', stroke: 'hsl(0, 0%, 100%)' },
          open: { d: 'M 3 16.5 L 17 2.5', stroke: 'hsl(0, 0%, 18%)' },
        }}
        transition={transition}
      />
      <motion.path
        d="M 2 9.423 L 20 9.423"
        stroke="hsl(0, 0%, 100%)"
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
          closed: { d: 'M 2 16.346 L 20 16.346', stroke: 'hsl(0, 0%, 100%)' },
          open: { d: 'M 3 2.5 L 17 16.346', stroke: 'hsl(0, 0%, 18%)' },
        }}
        transition={transition}
      />
    </svg>
  );
};

export default MenuIcon;
