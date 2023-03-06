import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { NavLink } from './NavLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

import { Archive, Camera, User, Menu, XCircle } from 'react-feather';

import styles from './Header.module.scss';

const Header = () => {
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

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        {width <= 600 && (
          <div>
            <Menu />
          </div>
        )}
        <ul
          className={
            width > 600
              ? styles.navLinks
              : `${styles.navLinks} ${styles.collapsed}`
          }
        >
          <li>
            <NavLink href="/" activeClassName={styles.active}>
              <a>About</a>
            </NavLink>
          </li>
          <li>
            <NavLink href="/posts" activeClassName={styles.active}>
              <a>Blog</a>
            </NavLink>
          </li>
          <li>
            <NavLink href="/photos" activeClassName={styles.active}>
              <a>Photos</a>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
