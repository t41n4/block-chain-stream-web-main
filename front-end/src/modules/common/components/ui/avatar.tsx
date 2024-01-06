import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import React from "react";

type Props = {
  src: StaticImageData | string;
  alt: string;
} & React.HTMLAttributes<HTMLElement>;

const Avatar: React.FC<Props> = ({ className, src, alt, ...props }: Props) => {
  return (
    <div className={clsx("", className)}>
      <Image
        className={clsx("rounded-full border border-white", className)}
        loading="lazy"
        width={50}
        height={50}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Avatar;
