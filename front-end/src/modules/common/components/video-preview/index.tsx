
"use client";
import './index.scss';
import { Car, Loader2, LoaderIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import HoverVideoPlayer from 'react-hover-video-player';
import videojs from 'video.js';
import { CustomImage } from '@components/ui/image';
import { abbreviateNumber } from '@lib/utils';
import useStreamDetector from '../../../../lib/hook/use-stream-detector';
import { Card, CardContent, CardFooter, CardHeader } from '@modules/common/components/ui/card';
import VideoSkeleton from '@modules/skeletons/skeleton-video';


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
    data: Video;
} & React.HTMLAttributes<HTMLDivElement>;

// const video_src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
const video_src = "https://stream.mux.com/v69RSHhFelSm4701snP22dYz2jICy4E4FUyk02rW4gxRM.m3u8";


const VideoPreview = ({
    // tags = ["game", "music"],
    data,
    ...props
}: Props) => {

    const isLive = useStreamDetector(video_src);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const videoJsOptions = {
            liveui: true,
            liveTracker: true,
            autoplay: false,
            controls: true,
            sources: [
                {
                    src: video_src,
                    type: "application/x-mpegURL",
                },
            ],
            lowLatency: true,
            playbackRates: [0.5, 1, 1.5, 2],
            backBufferLength: 90,
            lowLatencyMode: true,
        };
        // Check if the videoRef exists before initializing video.js
        if (videoRef.current) {
            videojs(videoRef.current, { ...videoJsOptions }).addClass("video-js !bg-transparent");
            const playerInstance = videojs.getPlayer(videoRef.current);
            playerInstance.on("ready", () => {
                console.log("ready");
            });
        }
    }, []);

    return (
        <Card className="relative p-2 transition-all hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <Link href={`/stream/${data.Owners.username}`} className='w-full'>

                {isLive && (
                    <div className="absolute text-xs px-1 py-0.5 font-semibold bg-red-600 rounded top-4 text-white left-4 z-50">
                        <p className="uppercase"> Live</p>
                    </div>
                )}

                <CardContent className="p-0 h-[30vh]">
                    {
                        videoRef ? (
                            <HoverVideoPlayer
                                className='w-full h-full relative '
                                videoRef={videoRef}
                                videoClassName='videopreview'
                                videoSrc={data.video_thumbnail}
                                // videoSrc={video_src}
                                pausedOverlay={
                                    <CustomImage
                                        src={data.video_thumbnail}
                                        alt="/"
                                        width={300}
                                        height={200}
                                        className="object-cover w-full h-full rounded-2xl"
                                    />

                                }
                                loadingOverlay={
                                    <div className="loading-overlay flex w-full h-full justify-center items-center opacity-60 bg-black ">
                                        <Loader2 className="animate-spin text-white opacity-100" />
                                    </div>
                                }
                            />
                        ) :
                            (
                                <VideoSkeleton className='w-full h-full relative' />
                            )

                    }
                </CardContent>

                <CardFooter className="flex flex-col items-start p-2 gap-1">
                    <Link href={`/stream/${data.video_id}`}>
                        <p className="font-bold truncate">{data.video_name}</p>
                    </Link>


                    <p className="text-sm text-gray-500 py-[2px]">{abbreviateNumber(data.video_views)} viewers</p>
                    <div className="flex">
                        <div>
                            <div className="flex items-center space-x-2">
                                {data.Owners.user_avatar && (
                                    <CustomImage
                                        src={data.Owners.user_avatar}
                                        alt="/"
                                        width={36}
                                        height={36}
                                        className="object-cover rounded-[50%]"
                                    />
                                )}
                                <p className="text-xs">@{data.Owners.username}</p>
                            </div>
                            {/* {tags?.length !== 0 && (
                                <div className='flex gap-2 mt-1'>
                                    {
                                        tags.map((tag) => (
                                            <p className="text-sm bg-gray-700 hover:bg-gray-600 rounded-full inline-block p-[2px] px-3">
                                                {tag}
                                            </p>
                                        ))
                                    }
                                </div>
                            )} */}
                        </div>
                    </div>
                </CardFooter>

            </Link>
        </Card>
    );
};

export default VideoPreview;
