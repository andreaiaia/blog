import React from 'react';

import NavItems from './NavItems';

import styles from './FullNav.module.scss';

export const FullNav = ({ pages }) => {
  return (
    <nav className={styles.nav}>
      <NavItems pages={pages} />
    </nav>
  );
};
