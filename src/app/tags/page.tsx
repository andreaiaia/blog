import React from 'react';
import { getAllTags } from '@lib/tags';
import { getSortedPostsData } from '@lib/posts';
import { PostData } from '@lib/types';

import Post from '@components/Thumbnails/Post';
import Hero from '@components/Hero';
import Tag from '@components/Tag';
import ReturnToTop from './ReturnToTop';

import css from './Tags.module.scss';

function getData() {
  const allTags = getAllTags();
  const allPostsData = getSortedPostsData();

  return {
    allTags,
    allPostsData,
  };
}

type TaggedPostsProps = {
  allPostsData: PostData[];
  tag: string;
};

const TaggedPosts = ({ allPostsData, tag }: TaggedPostsProps) => {
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
                slug={id}
                date={formattedDate}
                title={title}
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

type TagCloudProps = {
  tags: {
    [key: string]: number;
  };
};

const TagCloud = ({ tags }: TagCloudProps) => {
  return (
    <div className={css.tagCloud}>
      {Object.keys(tags)
        .sort((a, b) => a.localeCompare(b))
        .map((tag, index) => {
          return <Tag key={index} tag={tag} to={`#${tag}`} anchor />;
        })}
    </div>
  );
};

const Tags = () => {
  const { allTags, allPostsData } = getData();

  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Tags</h1>
          <TagCloud tags={allTags} />
        </div>
      </Hero>
      <section className={css.container}>
        {Object.keys(allTags)
          .sort((a, b) => a.localeCompare(b))
          .map((tag, index) => {
            return (
              <div key={`tag-${index}`} className={css.tag}>
                <div id={tag} className={css.tagHeading}>
                  <div className={css.tagTitle}>
                    <div className={css.postsCount}>
                      <p className={css.number}>{allTags[tag]}</p>
                      <p>{allTags[tag] > 1 ? 'Posts' : 'Post'}</p>
                    </div>
                    <h2>{tag}</h2>
                  </div>
                  <ReturnToTop />
                </div>
                <TaggedPosts tag={tag} allPostsData={allPostsData} />
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default Tags;
