'use client';

import React, { useEffect, useState } from 'react';

import { FullNav } from './FullNav';
import { MobileNav } from './MobileNav';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
  }, []);

  if (!mounted) return null;

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  // TODO remove 600 and put a not hard-coded variable
  if (width && width <= 600) return <MobileNav />;
  else return <FullNav />;
};

export default Navbar;
