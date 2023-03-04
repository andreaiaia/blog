import React, { useState } from 'react';
import Image from 'next/image';

import { NavLink } from './NavLink';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

import { Archive, Camera, User, Menu, XCircle } from 'react-feather';

import styles from './Header.module.scss';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleMenu = () => {
    setExpanded(() => !expanded);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navLinks}>
          <li onClick={handleMenu}>
            <NavLink href="/" activeClassName={styles.active}>
              <a>About</a>
            </NavLink>
          </li>
          <li onClick={handleMenu}>
            <NavLink href="/posts" activeClassName={styles.active}>
              <a>Blog</a>
            </NavLink>
          </li>
          <li onClick={handleMenu}>
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
