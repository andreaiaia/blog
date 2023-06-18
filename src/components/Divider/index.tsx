import React from 'react';

import styles from './Divider.module.scss';

type PropsType = {
  size: string;
  cname?: string;
};

const Divider = ({ size, cname }: PropsType) => {
  return <hr className={`${styles.separator} ${styles[size]} ${cname}`} />;
};

export default Divider;
