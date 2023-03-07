import React, { useState, useEffect } from 'react';

import NavItems from './NavItems';

import { Menu, XCircle } from 'react-feather';

import styles from './MobileNav.module.scss';

const MobileNav = () => {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(null);
  const [menuHeight, setMenuHeight] = useState(0);

  const handleMenu = () => {
    if (menuHeight <= 0) setMenuHeight(100);
    else setMenuHeight(0);
  };

  useEffect(() => {
    setMounted(true);
    setWidth(window.innerWidth);
    handleMenu();
  }, []);

  if (!mounted) return null;

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
    if (width > 600) setMenuHeight(100);
  });

  return (
    <div>
      {width <= 600 && (
        <button className={styles.menuIcon} onClick={handleMenu}>
          <Menu />
        </button>
      )}
      <NavItems />
    </div>
  );
};

export default MobileNav;
