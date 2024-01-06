'use client';

import View from '@modules/stream-view/view-videojs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Input } from '@modules/common/components/ui/input';
import { Label } from '@modules/common/components/ui/label';
import { Button } from '@modules/common/components/ui/button';
import { RTMP_LINK } from '@lib/helpers/env-provider';
import { useAuth } from 'context/auth-context';
import { CommentSchema, VideoSchema } from '@lib/constant/validation';
import { FormikInput, FormikInputWithAction } from '@modules/authentication/formik-comps';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import AlertLogin from '@modules/settings/profile/alert-login';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { DivideSquare, Loader2, Play } from 'lucide-react';
import { getAxiosParam } from '@lib/helpers/api';
import { storage } from '@lib/helpers/firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import axios, { AxiosError } from 'axios';
import { notifySuccess, notifyError, notifyWarning } from '@modules/common/components/toast-comps';
import { useRouter } from 'next/navigation';
import { storeUserData } from 'redux/slices/userSlices';
import { Skeleton } from '@modules/common/components/ui/skeleton';
import Image from 'next/image';
import { processImageBlob } from '@modules/settings/profile/profile-update';
import clsx from 'clsx';
import VideoSkeleton from '@modules/skeletons/skeleton-video';

type Stream = {
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

type GoLiveVideoProps = {
  video_owner: string;
  video_name: string;
  video_type: string;
  video_status: string;
  video_thumbnail: string;
}


const GoLivePageTempalate = () => {
  const [url, setURL] = useState<string>();
  const [streamData, setStreamData] = useState<Stream>();
  console.log('streamData: ', streamData);
  const currentPath = usePathname();
  const { user } = useAuth();
  const router = useRouter()

  const initMessage = {
    video_owner: user.user_id,
    video_name: streamData?.video_name || '',
    video_type: streamData?.video_type || 'stream',
    video_status: streamData?.video_status || 'live',
    video_thumbnail: streamData?.video_thumbnail || '',
  } as GoLiveVideoProps;

  const handleGoLive = async (values: GoLiveVideoProps, helper: FormikHelpers<GoLiveVideoProps>) => {

    const blob = values.video_thumbnail as unknown as Blob;

    if (blob) {
      const storageRef = ref(storage, `thumbnails/${values.video_owner}/${values.video_name}/${blob.name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      try {
        await uploadTask;
      }
      catch (err: any) {
        notifyError(`Upload thumnaail failed ${(err?.message).toLowerCase()}`);
      }
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      if (downloadURL) {
        const paramsCreateStream = getAxiosParam(
          process.env.NEXT_PUBLIC_API_URL + `/videos`,
          'POST',
          {
            video_owner: user.user_id,
            video_name: values.video_name,
            video_type: values.video_type,
            video_status: values.video_status,
            video_thumbnail: downloadURL,
          },
          '',
          {
            withCredentials: true,
          }
        );

        try {
          const res = await axios.request(paramsCreateStream);
          if (res.status === 201) {
            notifySuccess('Create stream success');
            helper.resetForm();
            router.push('/stream/' + user.username)
          }

        } catch (err: any) {
          console.log('err: ', err?.response?.status);

          if (err?.response?.status === 403) {
            notifyWarning(err?.response?.data?.message);
          }
          if (err?.response?.status === 500) {
            notifyWarning(err?.response?.data?.message);
          }
          else {
            notifyError(`Go live fail ${(err?.message).toLowerCase()}`);
          }
        }
      }
      else {
        notifyError('Upload thumbnail failed');
      }
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      const paramStream = getAxiosParam(`${process.env.NEXT_PUBLIC_API_URL}/streams/${user?.user_id}`, 'GET', {}, '', { withCredentials: true, });
      axios.request(paramStream).then((res) => {
        console.log('res: ', res);
        if (res?.data?.stream) {
          setStreamData(res.data.stream);
        }
      });
    }
  }, [user?.user_id, url]);

  useEffect(() => {
    if (streamData?.video_urls) {
      setURL(streamData?.video_urls);
    }
    else {
      const socket = io('https://nt208-g4.site');
      socket.on(`preview_${user.user_id}`, (url) => {
        setURL(url);
      });
    }
  }, [streamData]);

  return (
    <main className='container center-item h-screen'>
      {
        user.user_id ?
          (
            <div className='flex gap-2'>
              <Card className='basis-2/5 flex flex-col'>

                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    Connect your stream application with stream key below to start
                  </CardDescription>
                </CardHeader>

                <CardContent className='w-full m-0 h-full'>
                  {
                    url ? <View url={url} /> : <VideoSkeleton className="h-full w-full" />
                  }
                </CardContent>
              </Card>

              <Card className='basis-2/5'>

                <CardHeader>
                  <CardTitle>Set up your live streaming software</CardTitle>
                  <CardDescription>
                    Copy and paste this stream key into the live streaming software
                    you're using.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor='key'>Stream Key</Label>
                    <Input id='key' defaultValue={user.user_id} readOnly />
                  </div>
                  <div>
                    <Label htmlFor='rtmp'>Server URL</Label>
                    <Input id='rtmp' defaultValue={RTMP_LINK} readOnly />
                  </div>
                </CardContent>
              </Card>

              <Card className='basis-1/5'>
                <div className="flex flex-col gap-2 w-full h-full center-item">
                  <CardContent className='p-3'>
                    <Formik
                      initialValues={initMessage}
                      onSubmit={(values, helper) => handleGoLive(values, helper)}
                      validationSchema={VideoSchema}
                      enableReinitialize={true}
                    >
                      {({ submitForm, isSubmitting, isValid, values }) => {
                        const thumnail = processImageBlob(values?.video_thumbnail)
                        return (
                          <Form onKeyDown={(e) => {
                            if (e.key === 'Enter' && !isSubmitting && isValid) {
                              e.preventDefault();
                              submitForm();
                            }
                          }}>
                            <div className='flex flex-col h-full gap-2'>
                              <Field
                                disabled={isSubmitting || streamData?.video_urls}
                                name="video_name"
                                label="Video Title"
                                component={FormikInput}
                                placeholder="Video title"
                                autoComplete="off"
                              />

                              <div>
                                {
                                  values?.video_thumbnail ?
                                    (
                                      <Image
                                        src={thumnail ? thumnail : ''}
                                        alt="Picture of the thumbnail"
                                        width={300}
                                        height={200}
                                        className={clsx({ "opacity-60": isSubmitting || streamData?.video_urls })}
                                      />
                                    )
                                    :
                                    (
                                      <Skeleton className="h-32 w-full" />
                                    )
                                }
                              </div>

                              <Field
                                disabled={isSubmitting || streamData?.video_urls}
                                type="file"
                                name="video_thumbnail"
                                label="Video Thumbnail 👆"
                                component={FormikInput}
                                autoComplete="off"
                                className="w-full"
                              />

                              <div>
                                <div className='relative flex py-5 items-center w-full'>
                                  <div className='flex-grow border-t border-current'></div>
                                  <span className='flex-shrink mx-4 '>
                                    Go Live
                                  </span>
                                  <div className='flex-grow border-t border-current'></div>
                                </div>

                                <div className='w-full'>
                                  <button disabled={isSubmitting} onClick={(e) => {
                                    const button = e.target as HTMLButtonElement;
                                    button.classList.toggle("potato__button--active");
                                  }} className="potato__button w-full">
                                    <span className="w-full h-full">
                                      {
                                        isSubmitting ?
                                          <Loader2 className="w-6 h-6 animate-spin" />
                                          :
                                          <Play className="w-6 h-6" />
                                      }
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik >
                  </CardContent>
                </div>
              </Card>
            </div>
          )
          :
          (
            <div className='min-w-[40vw]'>
              <AlertLogin fallbackPath={currentPath} />
            </div>
          )
      }
    </main>
  );
};

export default GoLivePageTempalate;
