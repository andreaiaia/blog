import React from 'react';
import Link from 'next/link';
import { PostPropsType } from './types';

import PostMetadata from '@components/PostMetadata';
import Divider from '@components/Divider';

import styles from './PostCard.module.scss';

const PostCard = ({
  slug,
  title,
  description,
  date,
  stats,
  postPic,
}: PostPropsType) => {
  return (
    <div
      className={styles.container}
      style={{
        background: `url(${postPic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link href={`/posts/${slug}`} className={styles.content}>
        <div className={styles.article}>
          <p className={styles.title}>{title}</p>
          <Divider size="small" cname={styles.divider} />
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.data}>
          <div>
            <PostMetadata date={date} stats={stats} cname={styles.metadata} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
