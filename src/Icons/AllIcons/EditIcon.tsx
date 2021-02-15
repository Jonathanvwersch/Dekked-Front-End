import React from 'react';

export default function EditIcon({
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
        d="M2 11.4997V13.9997H4.5L11.8733 6.62634L9.37333 4.12634L2 11.4997ZM13.8067 4.69301C13.8685 4.63133 13.9175 4.55807 13.951 4.47743C13.9844 4.39678 14.0016 4.31032 14.0016 4.22301C14.0016 4.1357 13.9844 4.04924 13.951 3.96859C13.9175 3.88794 13.8685 3.81469 13.8067 3.75301L12.2467 2.19301C12.185 2.13121 12.1117 2.08218 12.0311 2.04872C11.9504 2.01527 11.864 1.99805 11.7767 1.99805C11.6894 1.99805 11.6029 2.01527 11.5223 2.04872C11.4416 2.08218 11.3683 2.13121 11.3067 2.19301L10.0867 3.41301L12.5867 5.91301L13.8067 4.69301Z"
        fill={colour}
      />
    </svg>
  );
}
