import React, { useEffect, useState } from 'react';

import Navbar from '../Navbar';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

import styles from './Header.module.scss';
import Link from 'next/link';

const Header = ({ pages }) => {
  const [mounted, setMounted] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [headerStyle, setHeaderStyle] = useState(styles.header);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > prevScroll) {
      setHeaderStyle(`${styles.header} ${styles.hidden}`);
    } else {
      setHeaderStyle(styles.header);
    }

    setPrevScroll(currentScroll);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  window.addEventListener('scroll', handleScroll);

  return (
    <header className={headerStyle}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <Navbar pages={pages} />
        <div className={styles.themeSwitcher}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
