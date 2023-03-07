import React, { useEffect, useState } from 'react';

import FullNav from './FullNav';
import MobileNav from './MobileNav';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
  }, []);

  if (!mounted) return null;

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  // if (width <= 600)
  return <MobileNav />;
  // else return <FullNav />;
};

export default Navbar;
