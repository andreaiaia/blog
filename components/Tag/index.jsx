import React from 'react';
import Link from 'next/link';

import styles from './Tag.module.scss';

const Tag = ({ tag, to }) => {
  return (
    <Link href={to || '#'} className={styles.tag}>
      {tag}
    </Link>
  );
};

export default Tag;
