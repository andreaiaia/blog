import React from 'react';

import Navbar from '../Navbar';
import ThemeSwitcher from '../ThemeSwitcher';
import Logo from '../Logo';

import styles from './Header.module.scss';
import Link from 'next/link';

const Header = () => {
  const pages = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/posts',
    },
    {
      name: 'Photos',
      href: '/photos',
    },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <Navbar pages={pages} />
      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
