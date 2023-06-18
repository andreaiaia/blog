import React from 'react';
import { getLatestPostsData } from '/lib/posts';

import Hero from '/components/Hero';
import { CardList } from '/components/PostsList';

import css from '/styles/PageNotFound.module.scss';

export async function getStaticProps() {
  const postsData = await getLatestPostsData();

  return {
    props: { postsData },
    revalidate: 10, // In seconds
  };
}

const pageNotFound = ({ postsData }) => {
  return (
    <main>
      <Hero cname={css.pageNotFound}>
        <div className={css.title}>
          <p>404</p>
          <h1>Page not found</h1>
        </div>
      </Hero>
      <CardList posts={postsData} title="May I suggest you some readings?" />
    </main>
  );
};

export default pageNotFound;
