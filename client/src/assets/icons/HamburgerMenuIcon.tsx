import React from "react";

export default function HamburgerMenuIcon({
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
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12H14V10.6667H2V12ZM2 8.66667H14V7.33333H2V8.66667ZM2 4V5.33333H14V4H2Z"
        fill={color}
      />
    </svg>
  );
}
