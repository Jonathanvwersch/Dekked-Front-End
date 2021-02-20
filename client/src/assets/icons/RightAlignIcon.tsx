import React from "react";

export default function RightAlignIcon({
  color = "var(--main-black)",
  className = "icon",
  size = "16",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 14H14V12.6667H2V14ZM6 11.3333H14V10H6V11.3333ZM2 8.66667H14V7.33333H2V8.66667ZM6 6H14V4.66667H6V6ZM2 2V3.33333H14V2H2Z"
        fill={color}
      />
    </svg>
  );
}
