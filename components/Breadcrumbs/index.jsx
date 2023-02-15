import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const path = asPath.split('/');

  return (
    <div className={styles.breadcrumbs}>
      <Link href={`/${path[0]}`}>
        <a className={styles.backlink}>Home</a>
      </Link>
      {path.slice(1, -1).map((item, index) => (
        <React.Fragment key={index}>
          {' > '}
          <Link href={`/${item}`}>
            <a className={styles.backlink}>{item}</a>
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
