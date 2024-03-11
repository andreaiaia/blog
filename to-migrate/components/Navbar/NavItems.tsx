'use client';
import React from 'react';
// import { usePathname } from 'next/navigation';

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
    href: '/blog',
  },
];

type NavItemsProps = {
  menuHandler?: () => void;
};

const NavItems = ({ menuHandler = () => null }: NavItemsProps) => {
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

type NavLinkProps = {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export const NavLink = ({ href, onClick, children }: NavLinkProps) => {
  // const pathname = usePathname();

  // const isActive = pathname === href;
  const isActive = false;

  return (
    <li className={styles.link}>
      <a
        href={href}
        onClick={onClick}
        className={isActive ? styles.active : ''}
      >
        {children}
      </a>
    </li>
  );
};

export default NavItems;
