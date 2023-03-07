import React from 'react';

import NavItems from './NavItems';

import styles from './FullNav.module.scss';

const FullNav = () => {
  return (
    <nav className={styles.nav}>
      <NavItems />
    </nav>
  );
};

export default FullNav;
