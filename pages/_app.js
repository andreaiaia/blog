import { useState } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/Navbar';

import 'nextra-theme-blog/style.css';
import '../styles/main.scss';
import '../styles/layout.scss';

import { NavbarContext } from '../Hooks/Context/GlobalContext';

export default function App({ Component, pageProps }) {
  const initialExpanded =
    typeof window !== 'undefined' ? window.innerWidth > 1100 : true;
  const [expanded, setExpanded] = useState(initialExpanded);

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
