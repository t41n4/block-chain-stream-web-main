import SkeletonLeftSideBar from "@modules/skeletons/skeleton-left-side-bar";
import SkeletonUserCard from '../../skeleton-user-card/index';

const SkeletonProfilePage = () => {
    return (
        <div className="flex h-full w-full gap-2 p-4 opacity-60">
            <SkeletonLeftSideBar className="basis-[20%]" />
            <SkeletonUserCard className="w-full" />
        </div>
    )
}

export default SkeletonProfilePage
