'use client';

import { useEffect, useState } from 'react';

import Navbar from '@components/Navbar';
import ThemeSwitcher from '@components/ThemeSwitcher';
import Logo from '@components/Logo';

import styles from './Header.module.scss';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [headerStyle, setHeaderStyle] = useState(styles.header);
  const headerStyles = {
    top: `${styles.header}`,
    hidden: `${styles.header} ${styles.hidden}`,
    visible: `${styles.header} ${styles.background}`,
  };

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > prevScroll) setHeaderStyle(headerStyles.hidden);
    else if (currentScroll < 200) {
      setHeaderStyle(headerStyles.top);
      return;
    } else setHeaderStyle(headerStyles.visible);

    setPrevScroll(currentScroll);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  window.addEventListener('scroll', handleScroll);

  return (
    <header id="top" className={headerStyle}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            <Logo />
          </a>
        </div>
        <Navbar />
        <div className={styles.themeSwitcher}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
