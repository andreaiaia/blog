import React from 'react';

import NavLink from './NavLink';

import styles from './NavItems.module.scss';

const NavItems = () => {
  return (
    <ul className={styles.navLinks}>
      <NavLink href="/">
        <a>About</a>
      </NavLink>
      <NavLink href="/posts">
        <a>Blog</a>
      </NavLink>
      <NavLink href="/photos">
        <a>Photos</a>
      </NavLink>
    </ul>
  );
};

export default NavItems;
