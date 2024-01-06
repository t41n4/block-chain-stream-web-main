'use client';

import { getAxiosParam } from '@lib/helpers/api';
import { Button } from '@modules/common/components/ui/button';
import SkeletonLeftSideBar from '@modules/skeletons/skeleton-left-side-bar';
import VideoSkeleton from '@modules/skeletons/skeleton-video';
import View from '@modules/stream-view/view-videojs';
import axios from 'axios';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatBox from '../chat-box';
import {
  Expand,
  Eye,
  Gift,
  Heart,
  MessageSquare,
  UserPlus,
} from 'lucide-react';
import './index.scss';
import { Card } from '@modules/common/components/ui/card';
import { Skeleton } from '@modules/common/components/ui/skeleton';
import Avatar from '@modules/common/components/ui/avatar';
import { abbreviateNumber } from '@lib/utils';
import { getMockContents } from '@lib/mock/useMockContent';
import StreamSideBar from '../stream-side-bar';
import { usePrepareContractWrite } from 'wagmi';

import { BrowserProvider, parseUnits, parseEther } from 'ethers';
import { API_URL } from '@lib/helpers/env-provider';
import { useAuth } from 'context/auth-context';
import { notifyError } from '@modules/common/components/toast-comps';

declare var window: any

type myParams = {
  slug: string;
} & Params;

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
};
type Owners = {
  username: string;
  user_fullname: string;
  user_email: string;
  user_avatar: string;
  user_wallet_address: string;
};

const StreamPageTempalate = () => {
  const params: myParams = useParams();
  const streamerUsername = params.slug;

  const { user } = useAuth();

  const [streamerID, setStreamerData] = useState<any>();
  const [streamData, setStreamData] = useState<Video>();
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [mockContents, setMockContents] = useState<any>();

  // console.log('streamerID: ', streamerID);
  // console.log('streamData: ', streamData);
  useEffect(() => {
    let paramStream = getAxiosParam(`${API_URL}/streams`, 'GET', {}, '', {
      withCredentials: true,
    });
    axios.request(paramStream).then((res) => {
      setMockContents([...res.data.streams.slice()]);
    });
  }, []);
  useEffect(() => {
    axios
      .request(
        getAxiosParam(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${streamerUsername}`,
          'GET',
          {},
          '',
          { withCredentials: true }
        )
      )
      .then((res) => {
        if (res?.data?.user_id) {
          setStreamerData(res.data.user_id);
        }
      });
  }, []);

  useEffect(() => {
    if (streamerID) {
      axios
        .request(
          getAxiosParam(
            `${process.env.NEXT_PUBLIC_API_URL}/follows/counts`,
            'POST',
            { user_id: streamerID },
            '',
            { withCredentials: true }
          )
        )
        .then((res) => {
          res?.data?.followers && setFollowersCount(res.data.followers);
        });
    }
  }, [streamerID]);

  useEffect(() => {
    axios
      .request(
        getAxiosParam(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${streamerUsername}`,
          'GET',
          {},
          '',
          { withCredentials: true }
        )
      )
      .then((res) => {
        if (res?.data?.user_id) {
          setStreamerData(res.data.user_id);
        }
      });
  }, []);

  useEffect(() => {
    if (streamerID) {
      const paramStream = getAxiosParam(
        `${process.env.NEXT_PUBLIC_API_URL}/streams/${streamerID}`,
        'GET',
        {},
        '',
        { withCredentials: true }
      );
      axios.request(paramStream).then((res) => {
        if (res?.data?.stream) {
          setStreamData(res.data.stream);
          axios({
            url: `${API_URL}/videos/${res.data.stream.video_id}/views`,
            method: 'PUT',
          }).then((res) => console.log(res));
        }
      });
    }
  }, [streamerID]);

  useEffect(() => {
    document.onreadystatechange = (e) => {
      if (document.readyState === 'complete') {
        axios({
          url: `${API_URL}/videos/${streamData?.video_id}/views`,
          method: 'PUT',
        }).then((res) => console.log(res));
      }
    };

    window.addEventListener('beforeunload', () => {
      axios({
        url: `${API_URL}/videos/${streamData?.video_id}/views`,
        method: 'DELETE',
      }).then((res) => console.log(res));
    });
  }, [streamData]);

  const handleFollow = () => {
    console.log(user);
    axios({
      url: `${API_URL}/follows`,
      method: 'POST',
      data: {
        follower_id: streamerID,
        following_id: user.user_id,
      },
      withCredentials: true,
    }).then((res) => {
      if (res.status === 201) {
        setFollowersCount((prev) => prev + 1);
      }
    });
  };
  
  console.log('streamData: ', streamData);

  const handleDonate = async () => {
    try {
      let provider = new BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const tx = (await signer).sendTransaction({
        to: streamData?.Owners.user_wallet_address,
        value: parseEther('0.02'),
      });
    }
    catch {
      notifyError("Donate fail")
    }
  };

  return (
    <main className='container h-screen center-item flex flex-col medium:flex-row relative overflow-hidden p-3 gap-2'>
      <div className='basis-1/5 h-full'>
        {mockContents ? (
          <StreamSideBar className='h-full w-full' data={mockContents} />
        ) : (
          <SkeletonLeftSideBar className='h-full w-full' />
        )}
      </div>

      <div className='basis-3/5 h-full'>
        {
          // streamData?.video_urls

          <section className='flex h-full gap-2 flex-col'>
            <div className='w-full h-full'>
              {streamData?.video_urls ? (
                <View
                  className='h-full'
                  url={streamData?.video_urls}
                  videoID={streamData?.video_id}
                />
              ) : (
                <VideoSkeleton className='h-full' />
              )}
            </div>
            {
              streamData ?
                (
                  <Card className="border bg-neutral-100 p-4 rounded-lg max-w-full">
                    <div className="mx-auto">
                      <div className="card md:flex ">
                        <div className="flex center-item">
                          <div className='m-3'>
                            <Avatar className="object-cover rounded-full w-20 h-20"
                              src={streamData.Owners.user_avatar ? streamData.Owners.user_avatar : "https://tailwindflex.com/public/images/user.png"}
                              alt={streamData.Owners.username} />
                          </div>

                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <div className='flex gap-4'>
                            <div>
                              <p className="font-bold">{streamData.video_name}</p>
                              <h3 className="text-xl heading">@{streamData.Owners.username}</h3>
                              <p className="mt-2 mb-3">{followersCount ? abbreviateNumber(followersCount) : "I have no follower yet"} </p>
                            </div>
                            <div className='flex center-item'>
                              <Button className="button text-white" onClick={handleFollow}>
                                <UserPlus /> Follow
                              </Button>
                              <Button className="button text-white" onClick={handleDonate}>
                                <Gift /> Donate
                              </Button>
                            </div>
                          </div>

                          <div className='flex gap-2'>
                            <span className='bg-gray-200 border px-3 py-1.5 rounded-lg text-sm'>
                              Discrete Math
                            </span>
                            <span className='bg-gray-200 border px-3 py-1.5 rounded-lg text-sm'>
                              Topology
                            </span>
                            <span className='bg-gray-200 border px-3 py-1.5 rounded-lg text-sm'>
                              Neural Nets
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Skeleton className='border p-4 rounded-lg max-w-full'>
                    <Skeleton className='mx-auto'>
                      <Skeleton className='card md:flex w-[90%]'>
                        <Skeleton className='w-20 h-20mx-auto mb-6 md:mr-6 object-cover rounded-full  bg-gray-300 '></Skeleton>
                        <Skeleton className='flex flex-col  w-full gap-2 flex-grow text-center md:text-left'>
                          <Skeleton className='text-gray-300 bg-gray-300 w-full'>
                            Senior Developer
                          </Skeleton>
                          <Skeleton className='text-xl heading text-gray-300 bg-gray-300  w-full'>
                            John Doe
                          </Skeleton>
                          <Skeleton className='mt-2 mb-3 text-gray-300 bg-gray-300  w-full'>
                            John is a Senior Developer, mainly works in backend
                            technologies.
                          </Skeleton>
                          <Skeleton className='flex gap-2'>
                            <Skeleton className='border px-3 py-1.5 rounded-lg text-sm text-gray-300 bg-gray-300'>
                              Discrete Math
                            </Skeleton>
                            <Skeleton className='border px-3 py-1.5 rounded-lg text-sm text-gray-300 bg-gray-300'>
                              Topology
                            </Skeleton>
                            <Skeleton className='border px-3 py-1.5 rounded-lg text-sm text-gray-300 bg-gray-300'>
                              Neural Nets
                            </Skeleton>
                          </Skeleton>
                        </Skeleton>
                      </Skeleton>
                    </Skeleton>
                  </Skeleton>
                )}
          </section>
        }
      </div>

      <div className='basis-3/5 medium:basis-1/5 w-full h-full'>
        <ChatBox username={streamerUsername} />
      </div>
    </main>
  );
};

export default StreamPageTempalate;
