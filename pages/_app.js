import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';

import { Navbar } from '../components/Navbar';

import { NavbarContext } from '../Hooks/Context/GlobalContext';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';

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
        <ThemeProvider defaultTheme="dark">
          <Navbar />
          <main className={expanded ? '' : 'collapsed'}>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </NavbarContext.Provider>
    </>
  );
}
