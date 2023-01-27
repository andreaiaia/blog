import React, { Children, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import ThemeSwitcher from '../ThemeSwitcher';
import { NavbarContext } from '../../Hooks/Context/GlobalContext';

import {
  Archive,
  Camera,
  GitHub,
  User,
  Instagram,
  Linkedin,
  Menu,
  XCircle,
} from 'react-feather';

import styles from './Navbar.module.scss';

const NavLink = ({
  children,
  activeClassName = 'active',
  inactive = 'inactive',
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const isActive = asPath === props.href || asPath === props.as;

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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { expanded, setExpanded } = useContext(NavbarContext);
  const YEAR = new Date().getFullYear();

  const handleMenu = () => {
    setExpanded(() => !expanded);
  };

  const closeMenu = () => {
    if (window.innerWidth < 1100) setExpanded(() => false);
  };

  useEffect(() => {
    closeMenu();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div
        className={
          expanded ? `${styles.options} ${styles.expanded}` : styles.options
        }
      >
        <button onClick={handleMenu}>
          <Menu alt="Open menu button" />
        </button>
        <ThemeSwitcher />
      </div>
      <header
        className={
          expanded ? `${styles.header} ${styles.expanded}` : styles.header
        }
      >
        <button className={styles.closeMenu} onClick={handleMenu}>
          <XCircle alt="Close menu button" />
        </button>
        <nav className={styles.nav}>
          <ul>
            <li onClick={closeMenu}>
              <User className={styles.icon} alt="" />
              <NavLink
                href="/"
                activeClassName={
                  theme === 'dark' ? styles.active : styles.activeDark
                }
                inactive={styles.inactive}
              >
                <span>About</span>
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <Archive className={styles.icon} alt="" />
              <NavLink
                href="/posts"
                activeClassName={
                  theme === 'dark' ? styles.active : styles.activeDark
                }
                inactive={styles.inactive}
              >
                <span>Blog</span>
              </NavLink>
            </li>
            <li onClick={closeMenu}>
              <Camera className={styles.icon} alt="" />
              <NavLink
                href="/photos"
                activeClassName={
                  theme === 'dark' ? styles.active : styles.activeDark
                }
                inactive={styles.inactive}
              >
                <span>Photos</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <small className={styles.socials}>
          <ul className={styles.socialsLinks}>
            <li>
              <a href="https://instagram.com/andreaiaia" target="_blank">
                <Instagram className={styles.icon} alt="Instagram logo" />
              </a>
            </li>
            <li>
              <a href="https://github.com/andreaiaia" target="_blank">
                <GitHub className={styles.icon} alt="Github logo" />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
                <Linkedin className={styles.icon} alt="Linkedin logo" />
              </a>
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
