import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const path = asPath.split('/');

  console.log(path);

  return (
    <div className={styles.breadcrumbs}>
      <Link href={`/${path[0]}`}>
        <a className={styles.backlink}>Home</a>
      </Link>
      {path.slice(1).map((item) => (
        <>
          {' > '}
          <Link href={`/${item}`}>
            <a className={styles.backlink}>{item}</a>
          </Link>
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
