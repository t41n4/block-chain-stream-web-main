import { cn } from '@lib/utils';
import Header from '@modules/common/components/header/header';
import RootWrapper from '@modules/common/components/wrapper/wrapper';
// import ClientLayout from '@modules/layout/client-layout';
import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';



// export const inter = Inter({ subsets: ['latin'] });
// import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'BCSW',
  description: 'Streaming platform with crypto currencies donation supported',
  themeColor: '#0C102E',
  icons: {
    icon: './favicon.ico', // /public path
  },
};

export default function Layout(props: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased relative bg-primary')}>
        <RootWrapper>
          <Header />
          {props.children}
        </RootWrapper>
        <ToastContainer position="bottom-right" newestOnTop />
      </body>
    </html>
  );
}
