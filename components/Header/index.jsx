import React from 'react';

import Navbar from '../Navbar';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Navbar />
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
