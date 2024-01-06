import React from "react";

type Props = {
  className?: string;
  size: number;
};

const DotLiveIcon = (props: Props) => {
  const { size } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="#FF0000" />
    </svg>
  );
};

export default DotLiveIcon;
