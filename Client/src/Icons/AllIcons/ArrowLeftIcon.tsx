import React from 'react';

export default function ArrowLeftIcon({
  colour = 'var(--main-black)',
  className = 'icon',
  size = '16'
}: {
  colour?: string;
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
        d="M10.272 11.06L7.2187 8L10.272 4.94L9.33203 4L5.33203 8L9.33203 12L10.272 11.06Z"
        fill={colour}
      />
    </svg>
  );
}
