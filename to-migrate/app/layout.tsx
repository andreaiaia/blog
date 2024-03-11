import Header from '@components/Header';
import Footer from '@components/Footer';

import '@styles/normalize.css';
import '@styles/main.scss';
import '@styles/layout.scss';
import '@styles/prismjs/prism-gruvbox-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export const metadata = {
  title: 'Andrea F.',
  description: 'Questo è il mio blog e di nessun altro.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      {children}
      <Footer />
    </html>
  );
}
