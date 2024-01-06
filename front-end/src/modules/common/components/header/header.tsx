"use client";

import InputSearch from "../ui/input-search";
import Actions from "./actions";
import Banner from "./banner";
import NavigatorLinks from "./navigator";

const Header = () => {
  return (
    <div id="header" className="bg-secondary text-white flex flex-row items-center justify-between h-12">
      <div className="flex flex-row h-full">
        <div className="flex h-full justify-center items-center">
          <Banner />
        </div>
        <NavigatorLinks className="hidden medium:flex" />
      </div>
      <InputSearch className="max-w-[300px]" placeholder="Search your favorite content" />
      <Actions className="hidden medium:flex" />
    </div>
  );
};

export default Header;
