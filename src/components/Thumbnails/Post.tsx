import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostPropsType } from './types';

import PostMetadata from '../PostMetadata';

import styles from './Post.module.scss';

const Post = ({
  slug,
  title,
  description,
  date,
  stats,
  postPic,
}: PostPropsType) => {
  return (
    <Link className={styles.container} href={`/posts/${slug}`}>
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
