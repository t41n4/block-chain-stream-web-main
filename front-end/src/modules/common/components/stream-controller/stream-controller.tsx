import { Button } from "@components/ui/button";
import LiveIcon from "@modules/common/icons/live-icon";
import {
  Eye,
  Forward,
  MoreVertical,
  Settings,
  Volume2Icon,
} from "lucide-react";

const StreamController = () => {
  return (
    <div className="flex w-full h-[90vh] justify-center items-center">
      <section className="bg-secondary flex flex-col justify-start p-2.5 gap-[10px] text-left  text-white w-full">
        <div className="bg-primary h-[54px] flex flex-row items-center justify-between py-0 px-10 box-border">
          <LiveIcon />
          <div className="flex flex-row items-center justify-center gap-[18px]">
            <Volume2Icon />
            <Settings />
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="flex-1 relative font-extrabold">
            ChessTV - 24/7 Streaming Of Chess Tournaments
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between">
          <div className="w-[405px] flex flex-row items-center justify-between">
            <div className="relative rounded-[50%] w-[58px] h-[53px] object-cover" />
            <div className="relative w-[151px] h-[52.1px]">
              <b className="absolute top-[0px] left-[0px] inline-block w-[151px] h-[48.75px]">
                Chess.com
              </b>
              <i className="absolute top-[37.17px] left-[0px] text-mini inline-block w-[146.04px] h-[14.93px]">
                1.46 M Followers
              </i>
            </div>
            <Button />
          </div>
          <div className="w-[209px] flex flex-row items-end justify-between text-center text-xl">
            <div className="relative w-[95.36px] h-[35.38px]">
              <div className="absolute top-[0px] left-[0px] rounded-mini bg-gainsboro-200 w-[95.36px] h-[35.38px]" />
              <Eye></Eye>
              <b className="absolute top-[4.42px] left-[44.88px] inline-block w-[45.66px] h-[28.78px]">
                25K
              </b>
            </div>
            <div className="relative w-[80.95px] h-[38.63px]">
              <MoreVertical />
              <Forward />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StreamController;
