'use client';
import React, { useState, useEffect } from 'react';
import { Props, Post } from './types';

import { PostCard } from '../Thumbnails';

import css from './CardList.module.scss';

const CardList = ({ posts, title }: Props) => {
  const [postsData, setPostsData] = useState<Post[]>([]);

  useEffect(() => {
    async function setData() {
      const data = await posts;
      setPostsData(data);
    }

    setData();
  }, [posts]);

  return (
    <section className={css.recentPosts}>
      <div className={css.title}>{title && <h2>{title}</h2>}</div>
      <div className={css.postsContainer}>
        <ul className={css.posts}>
          {postsData.map(
            ({ id, title, description, formattedDate, stats, pic }, index) => (
              <li key={index}>
                <PostCard
                  slug={id}
                  title={title}
                  description={description}
                  date={formattedDate}
                  stats={stats}
                  postPic={pic}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};

export default CardList;
