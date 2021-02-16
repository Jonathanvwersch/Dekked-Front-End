import React from 'react';

export default function ItalicsIcon({
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
        d="M6.66667 3.66602C6.66667 4.21935 7.11333 4.66602 7.66667 4.66602H8.14L5.86 9.99935H5C4.44667 9.99935 4 10.446 4 10.9993C4 11.5527 4.44667 11.9993 5 11.9993H8.33333C8.88667 11.9993 9.33333 11.5527 9.33333 10.9993C9.33333 10.446 8.88667 9.99935 8.33333 9.99935H7.86L10.14 4.66602H11C11.5533 4.66602 12 4.21935 12 3.66602C12 3.11268 11.5533 2.66602 11 2.66602H7.66667C7.11333 2.66602 6.66667 3.11268 6.66667 3.66602Z"
        fill={colour}
      />
    </svg>
  );
}
