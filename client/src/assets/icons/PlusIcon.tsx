import React from 'react';

export default function NumberedListIcon({
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
        d="M12.6654 8.66732H8.66536V12.6673H7.33203V8.66732H3.33203V7.33398H7.33203V3.33398H8.66536V7.33398H12.6654V8.66732Z"
        fill={colour}
      />
    </svg>
  );
}
