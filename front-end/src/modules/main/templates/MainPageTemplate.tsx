'use client';

import { getAxiosParam } from '@lib/helpers/api';
import { API_URL } from '@lib/helpers/env-provider';
import useStreamDetector from '@lib/hook/use-stream-detector';
import { abbreviateNumber } from '@lib/utils';
import Avatar from '@modules/common/components/ui/avatar';
import { Skeleton } from '@modules/common/components/ui/skeleton';
import LiveChannels from '@modules/common/components/video-list';
import VideoSkeleton from '@modules/skeletons/skeleton-video';
import View from '@modules/stream-view/view-videojs';
import axios from 'axios';
import clsx from 'clsx';
import { Dot, DivideSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import './index.scss';
import SkeletonLeftSideBar from '@modules/skeletons/skeleton-left-side-bar';


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


type SideBarProps = {
  data: Video[];
} & React.HTMLAttributes<HTMLDivElement>;

const SideBar: React.FC<SideBarProps> = ({ className, data, ...props }: SideBarProps) => {
  console.log('data: ', data);

  const isLive = useStreamDetector("https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8");

  return (
    <section className={clsx("flex flex-col w-64 dark:bg-gray-800  bg-[#f2f2f2] h-full rounded-lg  border-4  ", className)}>
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


const MainPageTemplate = () => {
  const [streams, setStreams] = useState<Video[]>([]);
  const [follow, setFollow] = useState<any>('');

  useEffect(() => {
    let paramStream = getAxiosParam(`${API_URL}/streams`, 'GET', {}, '', {
      withCredentials: true,
    });
    axios.request(paramStream).then((res) => {
      setStreams([...res.data.streams.slice()]);
    });
  }, []);

  useEffect(() => {
    if (streams.length > 0) {
      let paramStream = getAxiosParam(`${API_URL}/follows/counts`, 'POST', { user_id: streams[0]?.video_owner }, '', { withCredentials: true, });
      axios.request(paramStream).then((res) => {
        setFollow(res.data.followers);
      });
    }
  }, [streams]);


  return (
    <main className='container flex flex-col min-h-screen pt-3 medium:!p-5 gap-2'>

      <section className='flex flex-col medium:flex-row gap-2 w-full medium:h-[70vh]' >
        <div className='medium:basis-[80%] h-full w-full'>
          {
            streams.length > 0 ?
              (
                <View url={streams[0]?.video_urls} className='w-full h-full border-4 rounded-xl' />
              )
              :
              (
                <VideoSkeleton className='w-full h-full' />
              )

          }
        </div>

        <div className='h-full medium:basis-[20%]'>
          {

            streams.length > 0
            // false
              ?
              (
                <SideBar className='h-full w-full' data={streams} />
              )
              :
              (
                <SkeletonLeftSideBar className='h-full w-full' />
              )
          }
        </div>
      </section>

      <section className='w-full h-fit bg-white rounded-xl  '>
        {
          streams.length > 0
            // false 
            ?
            (
              <LiveChannels videos={streams.slice(0, 4)} />
            )
            :
            (
              <Skeleton className='w-full h-[40vh]' />
            )
        }
      </section>

    </main>
  );
};

export default MainPageTemplate;
