import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './NavItems.module.scss';

const NavItems = ({ menuHandler, pages }) => {
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

export const NavLink = (props) => {
  const { asPath } = useRouter();

  const isActive = asPath === props.href || asPath === props.as;

  return (
    <li className={styles.link}>
      <Link {...props} className={isActive ? styles.active : ''}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavItems;
