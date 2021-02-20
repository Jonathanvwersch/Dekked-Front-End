import React from "react";

export default function FlipIcon({
  color = "var(--main-black)",
  className = "icon",
  size = "16",
}: {
  color?: string;
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
        d="M5.33203 6.66732V5.33398H3.39203C4.31203 3.74065 6.03203 2.66732 7.9987 2.66732C10.4787 2.66732 12.5654 4.37398 13.1587 6.66732H14.532C13.912 3.62732 11.2254 1.33398 7.9987 1.33398C5.8187 1.33398 3.8787 2.38732 2.66536 4.00732V2.66732H1.33203V6.66732H5.33203ZM10.6654 9.33398V10.6673H12.6054C11.6854 12.2607 9.96536 13.334 7.9987 13.334C5.5187 13.334 3.43203 11.6273 2.8387 9.33398H1.46536C2.08536 12.374 4.77203 14.6673 7.9987 14.6673C10.1787 14.6673 12.1187 13.614 13.332 11.994V13.334H14.6654V9.33398H10.6654Z"
        fill={color}
      />
    </svg>
  );
}
