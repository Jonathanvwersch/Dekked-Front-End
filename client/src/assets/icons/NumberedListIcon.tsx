import React from "react";

export default function NumberedListIcon({
  color = "var(--main-black)",
  className = "icon",
  size = "16",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66536 8.66602V7.33268H13.9987V8.66602H4.66536ZM4.66536 12.666V11.3327H13.9987V12.666H4.66536ZM4.66536 4.66602V3.33268H13.9987V4.66602H4.66536ZM1.9987 5.33268V3.33268H1.33203V2.66602H2.66536V5.33268H1.9987ZM1.33203 11.3327V10.666H3.33203V13.3327H1.33203V12.666H2.66536V12.3327H1.9987V11.666H2.66536V11.3327H1.33203ZM2.83203 6.66602C2.96464 6.66602 3.09182 6.71869 3.18558 6.81246C3.27935 6.90623 3.33203 7.03341 3.33203 7.16602C3.33203 7.29935 3.2787 7.42602 3.19203 7.51268L2.0787 8.66602H3.33203V9.33268H1.33203V8.71935L2.66536 7.33268H1.33203V6.66602H2.83203Z"
        fill={color}
      />
    </svg>
  );
}
