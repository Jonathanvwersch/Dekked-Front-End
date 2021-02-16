import React from 'react';

export default function MoveIcon({
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
        d="M7.33464 11.9993C7.33464 12.7327 6.73464 13.3327 6.0013 13.3327C5.26797 13.3327 4.66797 12.7327 4.66797 11.9993C4.66797 11.266 5.26797 10.666 6.0013 10.666C6.73464 10.666 7.33464 11.266 7.33464 11.9993ZM6.0013 6.66602C5.26797 6.66602 4.66797 7.26602 4.66797 7.99935C4.66797 8.73268 5.26797 9.33268 6.0013 9.33268C6.73464 9.33268 7.33464 8.73268 7.33464 7.99935C7.33464 7.26602 6.73464 6.66602 6.0013 6.66602ZM6.0013 2.66602C5.26797 2.66602 4.66797 3.26602 4.66797 3.99935C4.66797 4.73268 5.26797 5.33268 6.0013 5.33268C6.73464 5.33268 7.33464 4.73268 7.33464 3.99935C7.33464 3.26602 6.73464 2.66602 6.0013 2.66602ZM10.0013 5.33268C10.7346 5.33268 11.3346 4.73268 11.3346 3.99935C11.3346 3.26602 10.7346 2.66602 10.0013 2.66602C9.26797 2.66602 8.66797 3.26602 8.66797 3.99935C8.66797 4.73268 9.26797 5.33268 10.0013 5.33268ZM10.0013 6.66602C9.26797 6.66602 8.66797 7.26602 8.66797 7.99935C8.66797 8.73268 9.26797 9.33268 10.0013 9.33268C10.7346 9.33268 11.3346 8.73268 11.3346 7.99935C11.3346 7.26602 10.7346 6.66602 10.0013 6.66602ZM10.0013 10.666C9.26797 10.666 8.66797 11.266 8.66797 11.9993C8.66797 12.7327 9.26797 13.3327 10.0013 13.3327C10.7346 13.3327 11.3346 12.7327 11.3346 11.9993C11.3346 11.266 10.7346 10.666 10.0013 10.666Z"
        fill={colour}
      />
    </svg>
  );
}
