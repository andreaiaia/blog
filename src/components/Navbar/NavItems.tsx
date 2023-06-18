import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './NavItems.module.scss';

// TODO make this customizable at higher level
const pages = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Photos',
    href: '/photos',
  },
  {
    name: 'Blog',
    href: '/posts',
  },
];

type NavItemsProps = {
  menuHandler: () => void;
};

const NavItems = ({ menuHandler }: NavItemsProps) => {
  return (
    <ul className={styles.navLinks}>
      {pages.map((page, index) => (
        <NavLink key={index} href={page.href} onClick={menuHandler}>
          {page.name}
        </NavLink>
      ))}
    </ul>
  );
};

NavItems.defaultProps = {
  menuHandler: () => null,
  pages: [],
};

type NavLinkProps = {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const NavLink = ({ href, onClick, children }: NavLinkProps) => {
  const { asPath } = useRouter();

  const isActive = asPath === href;

  return (
    <li className={styles.link}>
      <Link
        href={href}
        onClick={onClick}
        className={isActive ? styles.active : ''}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItems;
