import ProfilePageTemplate from '@modules/settings/profile/template';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Profile Page',
  metadataBase: new URL('https://acme.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'vi-VN': '/vi-VN',
    },
  },
  openGraph: {
    images: '/og-image.png',
  },
}

const ProfilePage: NextPage = async () => {
  return <ProfilePageTemplate />
}

export default ProfilePage;
