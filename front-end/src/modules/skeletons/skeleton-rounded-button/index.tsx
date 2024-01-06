import { Skeleton } from "@modules/common/components/ui/skeleton";
import React from "react";


type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonRoundedButton: React.FC<Props> = ({ className, ...props }: Props) => {

    return (
        <div className="skeleton__left_side_bar">
            <Skeleton className='rounded-full p-5' />
        </div>

    );
};

export default SkeletonRoundedButton;
