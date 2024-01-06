import { Skeleton } from "@modules/common/components/ui/skeleton";
import clsx from "clsx";
import React from "react";


type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonLeftSideBar: React.FC<Props> = ({ className, ...props }: Props) => {

    return (
        <div className={clsx("skeleton__left_side_bar", className)}>
            <Skeleton className='w-full h-full' />
        </div>

    );
};

export default SkeletonLeftSideBar;
