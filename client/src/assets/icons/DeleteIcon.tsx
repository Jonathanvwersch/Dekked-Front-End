import React from "react";

export default function DeleteIcon({
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
        d="M3.9987 12.6667C3.9987 13.4 4.5987 14 5.33203 14H10.6654C11.3987 14 11.9987 13.4 11.9987 12.6667V4.66667H3.9987V12.6667ZM12.6654 2.66667H10.332L9.66536 2H6.33203L5.66536 2.66667H3.33203V4H12.6654V2.66667Z"
        fill={color}
      />
    </svg>
  );
}
