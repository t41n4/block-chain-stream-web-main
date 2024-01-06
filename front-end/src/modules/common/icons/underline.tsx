import React from "react";

type Props = {
  className?: string;
};

const Underline = (props: Props) => {
  const { className } = props;
  return (
    <svg
      width="50"
      height="3"
      viewBox="0 0 74 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.875 2.5L71.125 2.5"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Underline;
