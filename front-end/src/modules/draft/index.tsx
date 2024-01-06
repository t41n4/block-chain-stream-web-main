import { streamInfoData } from "@lib/constant/stream-json";
import ViewInfomation from "@modules/stream-view/view-infomation";
import { List } from "lucide-react";
import React from "react";

type Props = {};

const LeftSideBarTemplate = (props: Props) => {
  return (
    <section className="stream__list flex items-center justify-center h-full">
      <div className=" items-start flex flex-col ">
        <div className="items-start flex justify-between gap-5 ">
          <List strokeWidth={2} size={40} />
          <h1 className="justify-center text-white text-center text-4xl font-bold">
            Following
          </h1>
        </div>

        <div className="flex gap-5 mt-10 w-max flex-col">
          {streamInfoData.map((userInfo, index) => (
            <ViewInfomation key={index} {...userInfo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeftSideBarTemplate;
