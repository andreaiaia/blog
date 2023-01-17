import React, { Children, useContext } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
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

const NavLink = ({ children, activeClassName = 'active', ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const isActive = asPath === props.href || asPath === props.as;
  const inactive = 'inactive';

  const className = cx(
    childClassName,
    { [activeClassName]: isActive },
    { [inactive]: !isActive }
  );

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export const Navbar = () => {
  const { expanded, setExpanded } = useContext(NavbarContext);
  const YEAR = new Date().getFullYear();

  const handleMenu = () => {
    setExpanded(() => !expanded);
  };

  const closeMenu = () => {
    // typeof window !== 'undefined' &&
    if (window.innerWidth < 1100) {
      setExpanded(() => false);
    }
  };

  return (
    <>
      <div
        className={
          expanded
            ? `${styles.options}`
            : `${styles.options} ${styles.collapsed}`
        }
      >
        {expanded ? (
          <button onClick={handleMenu}>
            <XCircle />
          </button>
        ) : (
          <button onClick={handleMenu}>
            <Menu />
          </button>
        )}
      </div>
      <header
        className={
          expanded ? `${styles.header}` : `${styles.header} ${styles.collapsed}`
        }
      >
        <nav className={styles.nav}>
          <ul>
            <li onClick={closeMenu}>
              <Home className={styles.icon} />
              <NavLink href="/">
                <span>Home</span>
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <Archive className={styles.icon} />
              <NavLink href="/posts">
                <span>Posts</span>
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <Camera className={styles.icon} />
              <NavLink href="/photos">
                <span>Photos</span>
              </NavLink>
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
