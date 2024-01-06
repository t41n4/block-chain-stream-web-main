import VideoPreview from "@components/video-preview";
import "./index.scss";
import VideoSkeletonList from "@modules/skeletons/(templates)/skeleton-video-list";
import clsx from "clsx";

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
    videos: Video[];
} & React.HTMLAttributes<HTMLDivElement>;

const LiveChannels = ({ videos, className, ...props }: Props) => {
    return (
        <div className={clsx("px-4 py-2", className)}>
            <h2 className="text-base font-bold  md:text-xl">
                Live Channels we think you&apos;ll like
            </h2>

            <div className="grid grid-cols-1 gap-3 pt-3 medium:grid-cols-3 large:grid-cols-4">
                {videos?.length === 0 ? (<VideoSkeletonList shortlist />)
                    : (
                        <>
                            {
                                videos && videos.map((video) => (
                                    <VideoPreview
                                        key={video.video_id}
                                        data={video}
                                    />
                                ))
                            }
                        </>
                    )}
            </div>
        </div>
    );
};

export default LiveChannels;