import StreamPageTempalate from '@modules/stream-page/templates';
import { Metadata } from 'next';
import { API_URL } from '../../../lib/helpers/env-provider';


export const metadata: Metadata = {
    title: 'Stream Page',
    description: 'Stream Page',
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

// export async function generateStaticParams() {
//     const rawData = await fetch(`${API_URL}/users/usernames`, { cache: "no-store" });
//     const streams: { users: string[] } = await rawData.json();
//     console.log('streams: ', streams);

//     const paths = streams.users.map((username) => (
//         {
//             slug: username,
//         }
//     ));
//     return paths;
// }

const StreamPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    return <StreamPageTempalate />;
};

export default StreamPage;
