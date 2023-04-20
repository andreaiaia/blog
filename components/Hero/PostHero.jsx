import React from 'react';

import PostMetadata from '../PostMetadata';
import Tag from '../Tag';

import styles from './PostHero.module.scss';
import Image from 'next/image';

const PostHero = ({ date, data, stats }) => {
  const tags = data.tag.split(', ');

  return (
    <section className={styles.hero}>
      <div className={styles.postPic}>
        <Image
          src={data.pic}
          alt={data.description}
          fill
          sizes="(max-width: 768px) 300px,
                  500px"
        />
      </div>
      <div className={styles.postData}>
        <div className={styles.tags}>
          {tags.map((tag, index) => {
            return <Tag key={index} tag={tag} />;
          })}
        </div>
        <div className={styles.title}>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
        <PostMetadata cname={styles.metadata} date={date} stats={stats} />
      </div>
    </section>
  );
};

export default PostHero;
