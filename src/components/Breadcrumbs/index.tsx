import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const path = pathname.split('/');

  return (
    <div className={styles.breadcrumbs}>
      <Link href={`/${path[0]}`} className={styles.backlink}>
        Home
      </Link>
      {path.slice(1).map((item, index) => (
        <React.Fragment key={index}>
          {' > '}
          <Link href={`/${item}`} className={styles.backlink}>
            {item}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
