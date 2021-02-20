import React from "react";

export default function StudyQueueIcon({
  color = "#fff",
  className = "icon",
  size = "24",
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
        d="M6 0V15H9V0H6ZM9 2L13 15L16 14L12 1L9 2ZM2 2V15H5V2H2ZM0 16V18H18V16H0Z"
        fill={color}
      />
    </svg>
  );
}
