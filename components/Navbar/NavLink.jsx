import React from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './NavLink.module.scss';

const NavLink = (props) => {
  const { asPath } = useRouter();

  const isActive = asPath === props.href || asPath === props.as;

  return (
    <li>
      <Link {...props} className={isActive ? styles.active : ''}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavLink;
