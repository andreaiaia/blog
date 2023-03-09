import React from 'react';

import NavLink from './NavLink';

import styles from './NavItems.module.scss';

const NavItems = ({ menuHandler }) => {
  return (
    <ul className={styles.navLinks}>
      <NavLink href="/" onClick={menuHandler}>
        About
      </NavLink>
      <NavLink href="/posts" onClick={menuHandler}>
        Blog
      </NavLink>
      <NavLink href="/photos" onClick={menuHandler}>
        Photos
      </NavLink>
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
    <li>
      <Link {...props} className={isActive ? styles.active : ''}>
        {props.children}
      </Link>
    </li>
  );
};

export default NavItems;
