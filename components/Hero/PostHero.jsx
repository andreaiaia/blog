import React from 'react';
import Image from 'next/image';

import PostMetadata from '../PostMetadata';
import Tag from '../Tag';

import css from './PostHero.module.scss';

const PostHero = ({ date, data, stats }) => {
  const tags = data.tag.split(',');

  return (
    <section className={css.hero}>
      <div className={css.postPic}>
        <Image
          src={data.pic}
          alt={data.description}
          fill
          sizes="(max-width: 768px) 300px,
                  500px"
        />
      </div>
      <div className={css.postData}>
        <div className={css.tags}>
          {tags.map((tag, index) => {
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
