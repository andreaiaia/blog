import React from 'react';
import Link from 'next/link';

import styles from './Post.module.scss';

export const Post = ({ id, date, title, tag, description }) => {
  const formattedDate = new Date(date).toDateString();

  const tags = tag.split(', ');

  return (
    <div className={styles.postContainer}>
      <Link href={`/posts/${id}`}>
        <h1>{title}</h1>
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
        <p className={styles.date}>{formattedDate}</p>
        <p>&bull;</p>
        <Link href={`/posts/${id}`}>
          <a className={styles.readMore}>Read post...</a>
        </Link>
      </div>
    </div>
  );
};
