import { Metadata } from 'next';
import { Theme } from './Theme';

import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/normalize.css';
import '../styles/main.scss';
import '../styles/layout.scss';
import '../styles/prismjs/prism-gruvbox-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export const metadata: Metadata = {
  title: 'Andrea F.',
  description: 'Questo è il mio blog e di nessun altro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Theme>
      <html lang="en">
        <Header />
        <body>{children}</body>
        <Footer />
      </html>
    </Theme>
  );
}
