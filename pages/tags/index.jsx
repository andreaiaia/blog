import React from 'react';
import Hero from '../../components/Hero';
import css from './Tags.module.scss';
import { getAllTags } from '../../lib/tags';

export async function getStaticProps() {
  const allTags = await getAllTags();

  return {
    props: { allTags },
  };
}

const Tags = ({ allTags }) => {
  console.log(allTags);

  return (
    <main>
      <Hero cname={css.hero}>
        <div>
          <h1 className={css.title}>Tags</h1>
          <p>All tagged posts</p>
        </div>
      </Hero>
      <section className={css.container}>
        <ul className={css.posts}>
          {/* {allTags && allTags.map((tag, index) => <div key={index}>{tag}</div>)} */}
        </ul>
      </section>
    </main>
  );
};

export default Tags;
