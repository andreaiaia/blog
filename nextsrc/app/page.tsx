import type { Metadata } from 'next';
import Link from 'next/link';

import { getLatestPostsData } from '@lib/posts';

import { Polaroid } from '@components/Thumbnails';
import Hero from '@components/Hero';
import Button from '@components/Button';
import { CardList } from '@components/PostsList';

import Matera from '/public/images/photos/matera/thumbnail.webp';
import css from '@styles/Home.module.scss';

function getData() {
  const postsData = getLatestPostsData();

  return postsData;
}

export const metadata: Metadata = {
  title: 'Home - Andrea',
};

const Home = () => {
  const postsData = getData();

  return (
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
            <Button cname={css.homeCta}>
              <Link href="/blog">Read my Blog</Link>
            </Button>
            <Button cname={css.homeCta} secondary>
              <Link href="/photos">See my Photos</Link>
            </Button>
          </div>
        </div>
        <Polaroid cname={css.pic} src={Matera} alt="My home, Matera" />
      </Hero>
      <CardList posts={postsData} title="Latest posts" />
    </main>
  );
};

export default Home;
