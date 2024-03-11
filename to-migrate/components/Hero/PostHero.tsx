import { Image } from 'astro:assets';

import PostMetadata from '@components/PostMetadata';
import Tag from '@components/Tag';

import type { StatsType } from '@components/types';

import css from './PostHero.module.scss';

type Data = {
  title: string;
  description: string;
  tags: string[];
  pic: string;
};

type Props = {
  date: string;
  data: Data;
  stats: StatsType;
};

const PostHero = ({ date, data, stats }: Props) => {
  return (
    <section className={css.hero}>
      <div className={css.postPic}>
        <Image
          src={data.pic}
          alt={data.description}
          width={300}
          height={300}
          sizes="(max-width: 768px) 300px,
                  500px"
        />
      </div>
      <div className={css.postData}>
        <div className={css.tags}>
          {data.tags.map((tag, index) => {
            return <Tag key={index} tag={tag} to={`/tags#${tag}`} />;
          })}
        </div>
        <div className={css.title}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <PostMetadata cname={css.metadata} date={date} stats={stats} />
      </div>
    </section>
  );
};

export default PostHero;
