import React, { useEffect, useState } from 'react';

import { FullNav } from './FullNav';
import { MobileNav } from './MobileNav';

import { smartphone } from '../../styles/_globals.module.scss';

const Navbar = ({ pages }) => {
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

  if (width <= smartphone) return <MobileNav pages={pages} />;
  else return <FullNav pages={pages} />;
};

export default Navbar;
