"use client";

import { navLinks } from "@lib/constant/nav-links";
import PageIcon from "@modules/common/icons/page-icon";
import Link from "next/link";
import { Button } from "../ui/button";
import clsx from "clsx";

type Props = {} & React.HTMLAttributes<HTMLDivElement>;;

const DropDownMenu = () => {
  return (
    <div className="group relative">
      <div className="flex justify-center items-center h-fit w-fit hover:bg-[#9b5d5d]  p-5  ">
        <PageIcon className="h-10 w-10 large::h-5 large::w-5" />
      </div>

      <ul className="absolute opacity-0 invisible bg-[#9b5d5d] child-transform transition-all transform delay-150 ease-in-out group-hover:opacity-100 group-hover:visible mt-2 rounded-[20px] shadow-xl z-50 p-2">
        {navLinks.map((link, index) => (
          <li key={index}>
            <Button
              variant={"link"}
              className="flex flex-col items-center justify-center gap-[5px] min-w-[150px] hover:bg-secondary group  p-4 rounded-[20px]"
            >
              <div className="relative font-bold flex items-center justify-center w-full">
                {link.name}
              </div>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const VerticalMenu = () => {
  return (
    <div className="flex flex-row w-fit h-full items-center justify-start text-navigate md:text-sm">
      {navLinks.map((link, index) => (
        <Button
          variant={"link"}
          key={index}
          className="relative text-inherit flex flex-col items-center justify-center min-w-[5vw] hover:text-[#9b5d5d] group h-full "
        >
          <Link
            href={link.href}
            className="w-full font-bold flex items-center justify-center "
          >
            {link.name}
          </Link>
        </Button>
      ))}
    </div>
  );
};

const NavigatorLinks = ({ className, ...props }: Props) => {
  return (
    <div className={clsx("items-center justify-center gap-[20px]", className)}>
      {/* <DropDownMenu /> */}
      <VerticalMenu />
    </div>
  );
};

export default NavigatorLinks;
