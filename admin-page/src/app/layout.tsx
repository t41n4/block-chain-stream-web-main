import './globals.css';
import { Inter as FontSans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { RootWrapper } from '@/components/wrapper/rootWrapper';

import { cn } from '@/lib/utils';
import { Header } from '@/components/header/header';
import Login from './login/page';
import { cookies } from 'next/headers';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({ children }: any) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
