'use client';
import { ThemeProvider } from 'next-themes';

// Fix to support Server components
// https://nextjs.org/docs/getting-started/react-essentials#rendering-third-party-context-providers-in-server-components

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
