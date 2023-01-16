import React, { useContext } from 'react';

import Link from 'next/link';

import { NavbarContext } from '../../Hooks/Context/GlobalContext';

import {
  Archive,
  Camera,
  GitHub,
  Home,
  Instagram,
  Linkedin,
  Menu,
  Moon,
  Sun,
  XCircle,
} from 'react-feather';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { expanded, setExpanded } = useContext(NavbarContext);
  const YEAR = new Date().getFullYear();

  const handleMenu = () => {
    setExpanded(() => !expanded);
    console.log(expanded);
  };

  return (
    <>
      <div className={styles.options}>
        {expanded ? (
          <button onClick={handleMenu}>
            <XCircle />
          </button>
        ) : (
          <button onClick={handleMenu}>
            <Menu />
          </button>
        )}
        <Moon />
      </div>
      <header
        className={
          expanded ? `${styles.header}` : `${styles.header} ${styles.collapsed}`
        }
      >
        <nav className={styles.nav}>
          <ul>
            <li className={styles.active}>
              <Link href="./index">
                <>
                  <Home className={styles.icon} />
                  Home
                </>
              </Link>
            </li>
            <li>
              <Link href="./Posts">
                <>
                  <Archive className={styles.icon} />
                  Posts
                </>
              </Link>
            </li>
            <li>
              <Link href="./Photos">
                <>
                  <Camera className={styles.icon} />
                  Photos
                </>
              </Link>
            </li>
          </ul>
        </nav>
        <small className={styles.socials}>
          <ul className={styles.socialsLinks}>
            <li>
              <Link href="https://instagram.com/andreaiaia">
                <Instagram className={styles.icon} />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/andreaiaia">
                <GitHub className={styles.icon} />
              </Link>
            </li>
            <li>
              <Link href="https://linkedin.com/in/andreaiaia/">
                <Linkedin className={styles.icon} />
              </Link>
            </li>
          </ul>
          <div className={styles.credits}>
            <time>{YEAR}</time> © Andrea Bianchi.{' '}
            <a className={styles.rss} href="/feed.xml">
              RSS
            </a>
          </div>
        </small>
      </header>
    </>
  );
};
