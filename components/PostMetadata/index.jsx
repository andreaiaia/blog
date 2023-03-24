import React from 'react';

import styles from './PostMetadata.module.scss';

const PostMetadata = ({ date, stats, cname }) => {
  return (
    <div className={`${styles.meta} ${cname}`}>
      <p>{date}</p>
      <p className={styles.readingtime}>{stats.text}</p>
      <p>{stats.words} words</p>
    </div>
  );
};

export default PostMetadata;
