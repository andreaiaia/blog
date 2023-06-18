import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

import '../src/styles/normalize.css';
import '../src/styles/main.scss';
import '../src/styles/layout.scss';
import '../src/styles/prismjs/prism-gruvbox-dark.css';
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
      <ThemeProvider disableTransitionOnChange>
        <Header pages={pages} />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
