import React from 'react';

export default function ReturnIcon({
  colour = 'var(--main-black)',
  className = 'icon',
  size = '16'
}: {
  className?: string;
  colour?: string;
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
        d="M2.66797 6.66667L6.66797 2.66667L7.61464 3.61333L5.2213 6L12.668 6V14H11.3346V7.33333L5.2213 7.33333L7.61464 9.72L6.66797 10.6667L2.66797 6.66667Z"
        fill={colour}
      />
    </svg>
  );
}
