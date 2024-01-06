import repeat from "@lib/utils/repeat";
import { Skeleton } from "@modules/common/components/ui/skeleton";
import clsx from "clsx";
import React from "react";


type Props = {} & React.HTMLAttributes<HTMLDivElement>;

const SkeletonUserCard: React.FC<Props> = ({ className, ...props }: Props) => {

    return (
        <div className={clsx("skeleton__left_side_bar container center-item h-[90vh]", className)}>
            <div className="flex flex-col gap-2 w-[50%]">
                <div className="flex gap-3 center-item">
                    <Skeleton className='p-12 rounded-full ' />
                    <div className="flex w-full flex-col gap-2">
                        <Skeleton className='w-full p-4' />
                        <Skeleton className='w-full p-4' />
                        <Skeleton className='w-full p-4' />
                    </div>
                </div>

                {
                    repeat(4).map((_, index) => (
                        <div className="flex gap-2">
                            <Skeleton className='w-full p-4' />
                            <Skeleton className='w-full basis-[15%] p-4' />
                        </div>
                    ))
                }
                <div className="flex gap-2">
                    <Skeleton className='p-4 w-[100px]' />
                    <Skeleton className='p-4 w-[100px]' />
                </div>

            </div>
        </div>

    );
};

export default SkeletonUserCard;
