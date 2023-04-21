import React from 'react';
import Link from 'next/link';

import PostMetadata from '../PostMetadata';

import styles from './PostCard.module.scss';
import Divider from '../Divider';

const PostCard = ({ id, date, title, description, stats, postPic }) => {
  return (
    <div
      className={styles.container}
      style={{
        background: `url(${postPic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link href={`/posts/${id}`} className={styles.content}>
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
