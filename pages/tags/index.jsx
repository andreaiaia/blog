import React from 'react';
import { getAllTags } from '../../lib/tags';
import { getSortedPostsData } from '../../lib/posts';

import Post from '../../components/Thumbnails/Post';
import Hero from '../../components/Hero';
import Tag from '../../components/Tag';

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

const TagCloud = ({ tags }) => {
  console.log(tags);

  return (
    <div className={css.tagCloud}>
      {Object.keys(tags)
        .sort((a, b) => a.localeCompare(b))
        .map((tag, index) => {
          return <Tag key={index} tag={tag} to={`#${tag}`} toAnchor />;
        })}
    </div>
  );
};

const Tags = ({ allTags, allPostsData }) => {
  const returnToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // for smoothly scrolling
    });
  };

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
                  <button className={css.toTop} onClick={() => returnToTop()}>
                    Return to top
                  </button>
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
