import { getLatestPostsData } from '@lib/posts';

import Hero from '@components/Hero';
import { CardList } from '@components/PostsList';

import css from '@styles/NotFound.module.scss';

function getData() {
  const postsData = getLatestPostsData();

  return postsData;
}

const pageNotFound = () => {
  const postsData = getData();

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
