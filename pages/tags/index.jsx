import React from 'react';
import { getAllTags } from '../../lib/tags';
import { getSortedPostsData } from '../../lib/posts';

import Post from '../../components/Thumbnails/Post';
import Hero from '../../components/Hero';

import css from './Tags.module.scss';

export async function getStaticProps() {
  const allTags = await getAllTags();
  const allPostsData = getSortedPostsData();

  return {
    props: { allTags, allPostsData },
  };
}

const TaggedPosts = ({ allPostsData, tag }) => {
  return (
    <ul className={css.posts}>
      {allPostsData
        .filter(({ tags }) => tags.includes(tag))
        .map(
          (
            { id, formattedDate, title, author, tag, description, stats, pic },
            index
          ) => (
            <li key={`post-${tag}-${index}`}>
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
  );
};

const Tags = ({ allTags, allPostsData }) => {
  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Tags</h1>
          <p>All tagged posts</p>
        </div>
      </Hero>
      <section className={css.container}>
        {Object.keys(allTags).map((tag, index) => {
          return (
            <div key={`tag-${index}`} className={css.tag}>
              <h2>{tag}</h2>
              <TaggedPosts tag={tag} allPostsData={allPostsData} />
            </div>
          );
        })}
        <ul className={css.posts}>
          {/* {allTags && allTags.map((tag, index) => <div key={index}>{tag}</div>)} */}
        </ul>
      </section>
    </main>
  );
};

export default Tags;
