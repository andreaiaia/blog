import type { PostPropsType } from './types';

import PostMetadata from '@components/PostMetadata';
import Divider from '@components/Divider';

import css from './PostCard.module.scss';

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
      className={css.container}
      style={{
        background: `url(${postPic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <a href={`/blog/${slug}`} className={css.content}>
        <div className={css.article}>
          <p className={css.title}>{title}</p>
          <Divider size="small" cname={css.divider} />
          <p className={css.description}>{description}</p>
        </div>
        <div className={css.data}>
          <div>
            <PostMetadata date={date} stats={stats} cname={css.metadata} />
          </div>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
