import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import PostMetadata from '../PostMetadata';

import styles from './Post.module.scss';

const Post = ({ id, date, title, description, stats, postPic }) => {
  return (
    <Link className={styles.container} href={`/posts/${id}`}>
      <div className={styles.coverPic}>
        <Image src={postPic} alt={description} fill sizes="340px" />
        <div className={styles.data}>
          <div>
            <PostMetadata cname={styles.metadata} date={date} stats={stats} />
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
};

export default Post;
