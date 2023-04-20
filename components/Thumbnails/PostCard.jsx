import React from 'react';
import Link from 'next/link';

import PostMetadata from '../PostMetadata';

import styles from './PostCard.module.scss';

const PostCard = ({ id, date, title, description, stats, postPic }) => {
  return (
    <div
      className={styles.container}
      style={{
        background: `url(${postPic})`,
        backgroundSize: 'cover',
      }}
    >
      <Link href={`/posts/${id}`} className={styles.content}>
        <div className={styles.article}>
          <p className={styles.title}>{title}</p>
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
