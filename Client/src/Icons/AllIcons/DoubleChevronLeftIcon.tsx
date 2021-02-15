import React from 'react';

export default function DoubleChevronLeftIcon({
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
        d="M8.27203 11.06L5.2187 8L8.27203 4.94L7.33203 4L3.33203 8L7.33203 12L8.27203 11.06Z"
        fill={colour}
      />
      <path
        d="M13.2134 11.06L10.1601 8L13.2134 4.94L12.2734 4L8.27344 8L12.2734 12L13.2134 11.06Z"
        fill={colour}
      />
    </svg>
  );
}
