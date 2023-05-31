import React from 'react';
import { DividerPropsType } from '../types';

import styles from './Divider.module.scss';

const Divider = ({ size, cname }: DividerPropsType) => {
  return <hr className={`${styles.separator} ${styles[size]} ${cname}`} />;
};

export default Divider;
