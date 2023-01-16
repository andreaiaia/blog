import { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';

import { NavbarContext } from '../Hooks/Context/GlobalContext';

export default function App({ Component, pageProps }) {
  const [expanded, setExpanded] = useState(true);

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
      <NavbarContext.Provider value={{ expanded, setExpanded }}>
        <Navbar />
        <main className={expanded ? '' : 'collapsed'}>
          <Component {...pageProps} />
        </main>
      </NavbarContext.Provider>
    </>
  );
}
