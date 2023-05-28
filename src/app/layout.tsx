import { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';
import '../styles/prismjs/prism-gruvbox-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <ThemeProvider disableTransitionOnChange>
      <html lang="en">
        <Header pages={pages} />
        <body>{children}</body>
        <Footer />
      </html>
    </ThemeProvider>
  );
}
