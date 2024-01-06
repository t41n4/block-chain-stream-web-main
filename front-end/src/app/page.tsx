import MainPageTemplate from '@modules/main/templates/MainPageTemplate';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Home Page',
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
};

const Home = async () => {

  return (
    <MainPageTemplate />
  );
};

export default Home;
