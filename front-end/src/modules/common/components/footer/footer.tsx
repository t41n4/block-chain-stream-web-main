import clsx from "clsx";
import React from "react";
import Banner from "../header/banner";


const TextComponent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
  return (
    <p className={clsx(`text-base text-white-A700 w-auto ${className}`)}>
      {children}
    </p>
  )
};

type LinksColumnProps = {
  title: string;
  links: string[];
} & React.HTMLAttributes<HTMLDivElement>;

const LinksColumn: React.FC<LinksColumnProps> = ({ title, links }) => (
  <div className="flex flex-col gap-[50px] items-start justify-start w-auto">
    <TextComponent className="font-bold text-2xl md:text-[20px] sm:text-xl">
      {title}
    </TextComponent>
    <div
      className={`flex flex-col font-quicksand gap-[12px] md:h-auto items-start justify-between w-auto`}
    >
      {links.map((link, index) => (
        <TextComponent key={index}>
          {link}
        </TextComponent>
      ))}
    </div>
  </div>
);

const Footer: React.FC = () => {
  const accountLinks = ["Wishlist", "Cart", "Track Order", "Shipping Details"];
  const usefulLinks = [
    "About Us",
    "Contact",
    "Hot deals",
    "Promotions",
    "New products",
  ];
  const helpCenterLinks = [
    "Payments",
    "Refund",
    "Checkout",
    "Shipping",
    "Q&A",
    "Privacy Policy",
  ];

  return (
    <div className="flex text-white bg-secondary flex-col md:flex-row-reverse items-center justify-between w-full">
      <div className="flex flex-row md:gap-10 items-start justify-between w-full px-[20vw] py-[50px] md:px-[10vw]">
        <LinksColumn title="Account" links={accountLinks} />
        <LinksColumn title="Useful Links" links={usefulLinks} />
        <LinksColumn title="Help Center" links={helpCenterLinks} />
      </div>
      <div className="w-[400px] h-[400px] flex justify-center items-center">
        <Banner fontSize="text-[40px]" />
      </div>
    </div>
  );
};

export default Footer;
