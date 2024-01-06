import { buttons } from '@lib/constant/profile-side-bar-buttons';
import useStreamDetector from '@lib/hook/use-stream-detector';
import { abbreviateNumber } from '@lib/utils';
import Avatar from '@modules/common/components/ui/avatar';
import clsx from 'clsx';
import { Dot } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import './index.scss';

type Video = {
    video_id: string;
    video_name: string;
    video_type: string;
    video_label?: any;
    video_owner: string;
    video_views: number;
    video_status: string;
    video_thumbnail: string;
    video_urls: string;
    Owners: Owners;
}
type Owners = {
    username: string;
    user_fullname: string;
    user_email: string;
    user_avatar: string;
}


type Props = {
    data: Video[];
} & React.HTMLAttributes<HTMLDivElement>;

const StreamSideBar: React.FC<Props> = ({ className, data, ...props }: Props) => {
    console.log('data: ', data);

    const isLive = useStreamDetector("https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8");

    return (
        <section className={clsx("hidden large:flex flex-col w-64 dark:bg-gray-800  bg-[#f2f2f2] h-full rounded-lg  border-4  ", className)}>
            <div className="flex items-center justify-center h-16 dark:bg-gray-900 bg-[#f2f2f2] rounded-lg">
                <span className="dark:text-white font-bold uppercase">RECOMMENDED CHANNELS</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <ul className="flex flex-col px-2 py-4 gap-2 bg-gray-800">
                    {

                        data.map((item, index) => (
                            <Link key={index} href={`stream/${item.Owners.username}`} className="flex w-full items-center  text-gray-100 hover:bg-gray-700 p-1">
                                <li className="w-full">
                                    <div className="flex items-center w-full justify-between">
                                        <Avatar className='w-12 h-12' src={item?.Owners.user_avatar} alt={item?.Owners.username} />
                                        <div className="flex flex-col  ml-2  max-w-[100px] text-left">
                                            <span className="text-sm font-medium text-gray-100 truncate">{item?.video_name}</span>
                                            <span className="text-sm font-light text-gray-400 truncate" >@{item?.Owners.username}</span>
                                            <div />
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div>{isLive ? (<Dot className='text-red-600' strokeWidth={10} size={24} />) : ((<Dot className='text-gray-400' size={24} strokeWidth={10} />))}</div>
                                            <div>{abbreviateNumber(item?.video_views)}</div>
                                        </div>
                                    </div>

                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </section>

    );
};

export default StreamSideBar;

