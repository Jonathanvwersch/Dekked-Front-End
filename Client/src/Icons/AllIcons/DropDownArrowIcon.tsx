import React from 'react';

export default function DropDownArrowIcon({
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
      <path d="M4.66797 6.66602L8.0013 9.99935L11.3346 6.66602H4.66797Z" fill={colour} />
    </svg>
  );
}
