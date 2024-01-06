import { useEffect, useState } from 'react';


const useStreamDetector = (url: string) => {
    const [isStream, setIsStream] = useState(false);

    useEffect(() => {
        const checkStream = async () => {
            const res1 = await fetch(url);
            const data1 = await res1.text();
            const links1 = data1.split('\n').filter((line: string) => line.startsWith('http'));
            console.log('links1: ', links1);


            setTimeout(async () => {
                const res2 = await fetch(url);
                const data2 = await res2.text();
                const links2 = data2.split('\n').filter((line: string) => line.startsWith('http'));
                setIsStream(links1 !== links2);
            }, 3000);

        };

        checkStream();
    }, [url]);

    return isStream;
};

export default useStreamDetector;