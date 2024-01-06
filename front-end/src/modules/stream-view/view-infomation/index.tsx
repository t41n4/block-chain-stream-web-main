import Avatar from "@modules/common/components/ui/avatar";
import { StaticImageData } from "next/image";
import React from "react";

export type StreamInfomationProps = {
  imageSrc?: string | StaticImageData;
  username: string;
  bio: string;
  followersCount: number;
};

type ViewInfomationProps = StreamInfomationProps & React.HTMLAttributes<HTMLElement>;


const ViewInfomation: React.FC<ViewInfomationProps> = (
  {
    className,
    imageSrc = "https://avatars.githubusercontent.com/u/55942632?v=4",
    username,
    bio,
    followersCount,
    ...props
  }: ViewInfomationProps
) => {

  return (
    <div className={className}>
      <div className=" items-center flex">
        <Avatar src={imageSrc} alt="User Image" />
        <div className="items-start flex flex-col pl-2 pr-5">
          <p className="text-left text-white font-bold truncate w-[10em]">
            {username}
          </p>
          <p className="justify-center  text-white text-left font-medium">
            {followersCount} followers
          </p>
        </div>
      </div>
    </div>
  );
};
ViewInfomation.displayName = "StreamInfomation";

export default ViewInfomation;
