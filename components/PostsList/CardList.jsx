import React from 'react';

import { PostCard } from '/components/Thumbnails';

import css from './CardList.module.scss';

const CardList = ({ posts, title }) => {
  return (
    <section className={css.recentPosts}>
      <div className={css.title}>{title && <h2>{title}</h2>}</div>
      <div className={css.postsContainer}>
        <ul className={css.posts}>
          {posts.map(
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
