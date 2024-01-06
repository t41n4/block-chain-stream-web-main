import { Metadata, NextPage } from 'next';
import GoLivePageTempalate from '@modules/go-live/templates';

export const metadata: Metadata = {
  title: 'Preview Page',
  description: 'Preview Page',
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'vi-VN': '/vi-VN',
    },
  },
  openGraph: {
    images: '/image/stream-web.png',
  },
};

const GoLivePage: NextPage = () => {
  return <GoLivePageTempalate />;
};

export default GoLivePage;
