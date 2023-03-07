import React, { useState } from 'react';

import NavItems from './NavItems';

import { Menu, XCircle } from 'react-feather';

import styles from './MobileNav.module.scss';

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.menuIcon} onClick={handleMenu}>
        <Menu />
      </button>
      <nav className={open ? styles.nav : `${styles.nav} ${styles.collapsed}`}>
        <NavItems />
      </nav>
    </div>
  );
};

export default MobileNav;
