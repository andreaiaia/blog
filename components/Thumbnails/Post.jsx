import React from 'react';
import Link from 'next/link';

import PostMetadata from '../PostMetadata';

import styles from './Post.module.scss';

const Post = ({ id, date, title, tag, description, stats }) => {
  const tags = tag.split(', ');

  return (
    <div className={styles.container}>
      <Link href={`/posts/${id}`}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag, index) => {
          return (
            <p key={index} className={styles.tag}>
              {tag}
            </p>
          );
        })}
      </div>
      <div className={styles.data}>
        <PostMetadata date={date} stats={stats} cname={styles.metadata} />
        <p>&bull;</p>
        <Link href={`/posts/${id}`} className={styles.readMore}>
          Read post...
        </Link>
      </div>
    </div>
  );
};

export default Post;
