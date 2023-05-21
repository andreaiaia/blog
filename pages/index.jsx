import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { getLatestPostsData } from '/lib/posts';

import { Polaroid } from '/components/Thumbnails';
import Hero from '/components/Hero';
import Button from '/components/Button';
import { CardList } from '/components/PostsList';

import Matera from '/public/images/photos/matera/thumbnail.webp';
import css from '/styles/Home.module.scss';

export async function getStaticProps() {
  const postsData = await getLatestPostsData();

  return {
    props: { postsData },
    revalidate: 10, // In seconds
  };
}

const Home = ({ postsData }) => {
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
        <CardList posts={postsData} title="Latest posts" />
      </main>
    </>
  );
};

export default Home;
