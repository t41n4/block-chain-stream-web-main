import React from "react";
import { Skeleton } from '@components/ui/skeleton';


type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonLeftSideBar: React.FC<Props> = ({ className, ...props }: Props) => {

    return (
        <div className="skeleton__left_side_bar">
            <Skeleton className=' w-full h-full min-h-[90vh] min-w-[30vw] ' />
        </div>

    );
};

export default SkeletonLeftSideBar;
