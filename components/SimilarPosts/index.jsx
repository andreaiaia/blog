import React from 'react';

import Post from '../Thumbnails/Post';

import css from './SimilarPosts.module.scss';

const SimilarPosts = ({ similarPostsData }) => {
  return (
    <section className={css.similarPosts}>
      <h2>You may also like</h2>
      <ul className={css.posts}>
        {similarPostsData.map(
          (
            { id, formattedDate, title, author, tag, description, stats, pic },
            index
          ) => (
            <li key={index}>
              <Post
                id={id}
                date={formattedDate}
                title={title}
                author={author}
                tag={tag}
                description={description}
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

export default SimilarPosts;
