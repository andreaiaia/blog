import React from 'react';

import styles from './Divider.module.scss';

const Divider = ({ size, cname }) => {
  return <hr className={`${styles.separator} ${styles[size]} ${cname}`} />;
};

export default Divider;
