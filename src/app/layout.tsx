import { Metadata } from 'next';
import { ServerThemeProvider } from 'next-themes';
import { Providers } from './providers';

import Header from '@components/Header';
import Footer from '@components/Footer';

import '@styles/normalize.css';
import '@styles/main.scss';
import '@styles/layout.scss';
import '@styles/prismjs/prism-gruvbox-dark.css';
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
    <ServerThemeProvider attribute="class">
      <html lang="en">
        <body>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
