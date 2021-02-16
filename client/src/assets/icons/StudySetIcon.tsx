import React from "react";
import { theme } from "../../theme";
import { IconProps } from "../types";

const StudySetIcon: React.FC<IconProps> = ({
  className = "studyset-icon",
  colour = theme.colours.offBlack,
  size = theme.icons.size,
}) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <rect
          x="3.66667"
          y="2.66667"
          width="9.33667"
          height="12"
          rx="0.666667"
          stroke={colour}
          strokeWidth="1.33333"
        />
        <path
          d="M9.6665 0.666504H2.99984C2.26346 0.666504 1.6665 1.26346 1.6665 1.99984V9.6665"
          stroke={colour}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StudySetIcon;
