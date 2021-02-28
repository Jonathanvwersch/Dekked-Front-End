import React from "react";

export default function CenterAlignIcon({
  color = "var(--main-black)",
  className = "icon",
  size = "16",
}: {
  color?: string;
  className?: string;
  size?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66667 10V11.3333H11.3333V10H4.66667ZM2 14H14V12.6667H2V14ZM2 8.66667H14V7.33333H2V8.66667ZM4.66667 4.66667V6H11.3333V4.66667H4.66667ZM2 2V3.33333H14V2H2Z"
        fill={color}
      />
    </svg>
  );
}
