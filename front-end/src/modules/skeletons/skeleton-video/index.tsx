import { Skeleton } from '@components/ui/skeleton';
import clsx from 'clsx';
import React from 'react';
import './index.scss';

type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const VideoSkeleton = ({ className, children, ...props }: Props) => {
    return (
        <div className={clsx("w-full", className)}>
            <Skeleton className='w-full h-full min-h-[200px] center-item flex flex-col' >
                <div className="loader">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
                <>
                    Your content is under working...
                </>
            </Skeleton>
        </div>
    );
};


export default VideoSkeleton;
