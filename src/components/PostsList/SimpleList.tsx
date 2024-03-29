'use client';
import React, { useState, useEffect } from 'react';
import { Props, Post as PostType } from './types';

import Post from '@components/Thumbnails/Post';

import css from './SimpleList.module.scss';

const SimpleList = ({ posts, title }: Props) => {
  const [postsData, setPostsData] = useState<PostType[]>([]);

  useEffect(() => {
    async function setData() {
      const data = await posts;
      setPostsData(data);
    }

    setData();
  }, [posts]);

  return (
    <section className={css.container}>
      {title && <h2>{title}</h2>}
      <ul className={css.posts}>
        {postsData.map(
          ({ id, title, description, formattedDate, stats, pic }, index) => (
            <li key={index}>
              <Post
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
    </section>
  );
};

export default SimpleList;
