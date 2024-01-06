import favicon from 'app/favicon.ico';
import { MoreHorizontal, Share2 } from 'lucide-react';
import ViewInfomation from '../view-infomation';
import View from '../view-videojs';
import ViewersCount from '../viewer-count';
import { Button } from '@modules/common/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@modules/common/components/ui/card';

type Props = {};

const GroupMainTemplate = ({ title, username, avatar, followersCount, viewersCount, url, control} : any) => {
  return (
    <Card className='flex text-white flex-col rounded-xl shadow-xl bg-secondary border-none w-full h-full'>
      <CardContent className='flex w-full h-full items-center justify-center p-2'>
        { url && <View url={url}></View> }
      </CardContent>
      <CardFooter className='mt-[2.5em] flex flex-col justify-start items-start'>
        <h2 className='stream-watch-metadata font-bold text-[20px] text-left'>
          {title}
        </h2>

        <div className='flex flex-row items-center w-full pt-2'>
          <div className='flex flex-row  items-center w-full h-full justify-center '>
            <ViewInfomation
              className='flex items-center w-full h-full justify-center'
              username={username}
              bio="I'm a streamer"
              imageSrc={avatar}
              followersCount={followersCount}
            />
            <Button
              variant={'outline'}
              className='bg-beta rounded-full border-none'>
              <p className='font-bold px-2'>Follow</p>
            </Button>
          </div>

          <div className='flex flex-row justify-end gap-4 w-full'>
            <ViewersCount viewerCount={viewersCount} />
            <Share2 size={25} />
            <MoreHorizontal size={25} strokeWidth={3} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GroupMainTemplate;
