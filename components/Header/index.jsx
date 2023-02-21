import React, { Children, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import ThemeSwitcher from '../ThemeSwitcher';

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

import styles from './Header.module.scss';

const NavLink = ({ children, activeClassName = 'active', ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  const isActive = asPath === props.href || asPath === props.as;

  const className = cx(childClassName, { [activeClassName]: isActive });

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const YEAR = new Date().getFullYear();

  const handleMenu = () => {
    setExpanded(() => !expanded);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // <div className={styles.options}>
  //   <button onClick={handleMenu}>
  //     <Menu alt="Open menu button" />
  //   </button>
  //   <ThemeSwitcher />
  // </div>;
  // <button className={styles.closeMenu} onClick={handleMenu}>
  //   <XCircle alt="Close menu button" />
  // </button>

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/favicon.ico" alt="" width={48} height={48} />
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

// <small className={styles.socials}>
//   <ul className={styles.socialsLinks}>
//     <li>
//       <a href="https://instagram.com/andreaiaia" target="_blank">
//         <Instagram className={styles.icon} alt="Instagram logo" />
//       </a>
//     </li>
//     <li>
//       <a href="https://github.com/andreaiaia" target="_blank">
//         <GitHub className={styles.icon} alt="Github logo" />
//       </a>
//     </li>
//     <li>
//       <a href="https://linkedin.com/in/andreaiaia/" target="_blank">
//         <Linkedin className={styles.icon} alt="Linkedin logo" />
//       </a>
//     </li>
//   </ul>
//   <div className={styles.credits}>
//     <time>{YEAR}</time> © Andrea Bianchi.{' '}
//     <a className={styles.rss} href="/feed.xml">
//       RSS
//     </a>
//   </div>
// </small>
