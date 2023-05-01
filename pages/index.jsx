import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { getSortedPostsData } from '../lib/posts';
import { getLatestPostsData } from '../lib/notion';

import { PostCard } from '../components/Thumbnails';
import { Polaroid } from '../components/Thumbnails';
import Hero from '../components/Hero';
import Button from '../components/Button';

import Matera from '../public/images/photos/matera/thumbnail.webp';
import css from '../styles/Home.module.scss';

export const databaseId = process.env.NOTION_DATABASE_ID;

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const latestPosts = await getLatestPostsData(databaseId);

  console.log(latestPosts);
  return {
    props: { allPostsData },
    revalidate: 10, // In seconds
  };
}

const Home = ({ allPostsData }) => {
  return (
    <>
      <Head>
        <title>Home - Andrea</title>
        <meta property="og:title" content="homepage" key="title" />
      </Head>
      <main>
        <Hero cname={css.hero} background="transparent">
          <div className={css.greetings}>
            <h1>Hello, my name is Andrea</h1>
            <p>
              I&apos;m a <span className={css.accent}>Front-End Developer</span>{' '}
              from Matera, Italy and in my free time I love taking{' '}
              <span className={css.accent}>photos</span>.
            </p>
            <div className={css.CTAs}>
              <Button className={css.homeCta}>
                <Link href="/posts">Read my Blog</Link>
              </Button>
              <Button className={css.homeCta} secondary>
                <Link href="/photos">See my Photos</Link>
              </Button>
            </div>
          </div>
          <Polaroid cname={css.pic} src={Matera} alt="My home, Matera" />
        </Hero>
        <section className={css.recentPosts}>
          <div className={css.title}>
            <h2>Latest posts</h2>
          </div>
          <div className={css.postsContainer}>
            <ul className={css.posts}>
              {allPostsData
                .slice(0, 3)
                .map(
                  (
                    { id, formattedDate, title, pic, tag, description, stats },
                    index
                  ) => (
                    <li key={index}>
                      <PostCard
                        id={id}
                        date={formattedDate}
                        title={title}
                        tag={tag}
                        description={description}
                        stats={stats}
                        postPic={pic}
                      />
                    </li>
                  )
                )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
