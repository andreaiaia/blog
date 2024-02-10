import { Image } from 'astro:assets';
import type { PostPropsType } from './types';

import PostMetadata from '@components/PostMetadata';

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
    <a className={styles.container} href={`/blog/${slug}`}>
      <div className={styles.coverPic}>
        <Image
          src={postPic}
          alt={description}
          width={340}
          height={340}
          sizes="340px"
        />
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
    </a>
  );
};

export default Post;
