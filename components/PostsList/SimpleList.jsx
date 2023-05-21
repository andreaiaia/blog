import React from 'react';

import Post from '../Thumbnails/Post';

import css from './SimpleList.module.scss';

const SimpleList = ({ posts, title }) => {
  return (
    <section className={css.container}>
      {title && <h2>{title}</h2>}
      <ul className={css.posts}>
        {posts.map(
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
