import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import { Navbar } from '../components/Navbar';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';

export default function App({ Component, pageProps }) {
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
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
