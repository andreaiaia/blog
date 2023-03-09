import React, { useState } from 'react';

import NavItems from './NavItems';

import MenuIcon from './MenuIcon';

import styles from './MobileNav.module.scss';

export const MobileNav = ({ pages }) => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <MenuIcon isOpen={open} handler={handleMenu} />
      <nav className={open ? styles.nav : `${styles.nav} ${styles.collapsed}`}>
        <NavItems menuHandler={handleMenu} pages={pages} />
      </nav>
    </div>
  );
};
