import React from 'react';
import { StatsType } from '../types';

import styles from './PostMetadata.module.scss';

type PropsType = {
  date: string;
  stats: StatsType;
  cname?: string;
};

const PostMetadata = ({ date, stats, cname }: PropsType) => {
  return (
    <div className={`${styles.meta} ${cname}`}>
      <p>{date}</p>
      <p className={styles.readingtime}>{stats.text}</p>
      <p>{stats.words} words</p>
    </div>
  );
};

export default PostMetadata;
