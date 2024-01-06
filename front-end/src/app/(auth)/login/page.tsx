import AuthenticationPageTempalate from '@modules/authentication/templates/auth';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Auth Page',
  description: 'Auth Page',
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
}


const AuthPage: NextPage = async () => {
  return <AuthenticationPageTempalate />
}

export default AuthPage;
