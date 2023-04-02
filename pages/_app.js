import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default function App({ Component, pageProps }) {
  const pages = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Photos',
      href: '/photos',
    },
    {
      name: 'Blog',
      href: '/posts',
    },
  ];

  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <ThemeProvider>
        <Header pages={pages} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
