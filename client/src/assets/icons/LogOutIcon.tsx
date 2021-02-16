import React from "react";

export default function LogOutIcon({
  colour = "var(--main-black)",
  className = "icon",
  size = "16",
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
        d="M4.0013 1.33398H10.0013C10.3549 1.33398 10.6941 1.47446 10.9441 1.72451C11.1942 1.97456 11.3346 2.3137 11.3346 2.66732V4.00065H10.0013V2.66732H4.0013V13.334H10.0013V12.0007H11.3346V13.334C11.3346 13.6876 11.1942 14.0267 10.9441 14.2768C10.6941 14.5268 10.3549 14.6673 10.0013 14.6673H4.0013C3.64768 14.6673 3.30854 14.5268 3.05849 14.2768C2.80844 14.0267 2.66797 13.6876 2.66797 13.334V2.66732C2.66797 2.3137 2.80844 1.97456 3.05849 1.72451C3.30854 1.47446 3.64768 1.33398 4.0013 1.33398Z"
        fill={colour}
      />
      <path
        d="M10.7267 10.3927L11.6667 11.3327L15 7.99935L11.6667 4.66602L10.7267 5.60602L12.4467 7.33268H6V8.66602H12.4467L10.7267 10.3927Z"
        fill={colour}
      />
    </svg>
  );
}
