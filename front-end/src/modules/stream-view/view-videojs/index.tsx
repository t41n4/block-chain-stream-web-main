'use client';

import VideoSkeleton from '@modules/skeletons/skeleton-video';
import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'videojs-quality-selector-hls';
import './index.scss';
import axios from 'axios';
import { getAxiosParam } from '@lib/helpers/api';

type Props = {
  url?: string;
  videoID?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type MyPlayer = { qualitySelectorHls: () => void } & Player;

const View: FC<Props> = ({ className, url, videoID, ...props }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [isLive, setIsLive] = useState<boolean>(false);
  // const [player, setPlayer] = useState<any>(null);

  const [isError, setIsError] = useState<boolean>(false);
  const [isSucess, setIsSucess] = useState<boolean>(false);

  useEffect(() => {
    if (isSucess && videoID) {
      axios.request(getAxiosParam(`${process.env.NEXT_PUBLIC_API_URL}/videos/${videoID}/views`, 'PUT', {}, '', { withCredentials: true })).then((res) => {
        if (res.status === 200) {
          console.log('update view sucess: ');
        }
      });
    }

  }, [isSucess, videoID]);

  useEffect(() => {
    const videoJsOptions = {
      liveui: true,
      liveTracker: true,
      controls: true,
      sources: [
        {
          // src: "https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8",
          src: url,
          type: 'application/x-mpegURL',
        },
      ],
      lowLatency: true,
      enableWorker: true,
      lowLatencyMode: true,
      backBufferLength: 90,
      playbackRates: [0.5, 1, 1.5, 2],
      plugins: {
        qualityLevels: {},
      },
    };
    // Check if the videoRef exists before initializing video.js
    if (videoRef.current) {
      (videojs(videoRef.current, { ...videoJsOptions }) as MyPlayer).qualitySelectorHls();
      (videojs(videoRef.current, { ...videoJsOptions }) as MyPlayer).on('error', () => {
        console.log('play fail: ');

        setIsError(true);
      });
      (videojs(videoRef.current, { ...videoJsOptions }) as MyPlayer).on('play', () => {
        setIsSucess(true);
      });
    }
  }, []);

  return (

    <div className='relative h-full'>
      <div className={clsx('flex flex-col w-full h-[400px] justify-center items-center relative', className, { "hidden": !isError })}>
        <VideoSkeleton className='h-full center-item' />
      </div>

      <div className={clsx('flex flex-col w-full h-[400px] justify-center items-center relative', className, { "hidden": isError })}>
        <video
          ref={videoRef}
          controls
          className={'video-js vjs-default-skin w-full h-full flex flex-col justify-center items-center rounded-xl'} />
      </div>
    </div >


  );
};

export default View;
