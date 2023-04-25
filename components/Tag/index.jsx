import React from 'react';
import Link from 'next/link';

import styles from './Tag.module.scss';

const Tag = ({ tag, to, toAnchor }) => {
  if (toAnchor)
    return (
      <a href={to} className={styles.tag}>
        {tag}
      </a>
    );
  else
    return (
      <Link href={to || '#'} className={styles.tag}>
        {tag}
      </Link>
    );
};

export default Tag;
