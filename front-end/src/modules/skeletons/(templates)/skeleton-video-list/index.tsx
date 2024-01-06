import React from 'react';
import VideoSkeleton from '../../skeleton-video';

const VideoSkeletonList = ({ shortlist }: { shortlist?: boolean }) => {
    return (
        <>
            {[...Array(shortlist ? 4 : 25)].map((_i, index: number) => (
                <VideoSkeleton key={index} />
            ))}
        </>
    );
};

export default VideoSkeletonList;