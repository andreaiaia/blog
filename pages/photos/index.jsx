import React from 'react';
import { Tab } from '@headlessui/react';

import styles from './Photos.module.scss';

const index = () => {
  return (
    <article className={styles.container}>
      <h1>Photo Gallery</h1>
      <Tab.Group>
        <Tab.List>
          <Tab></Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </article>
  );
};

export default index;
