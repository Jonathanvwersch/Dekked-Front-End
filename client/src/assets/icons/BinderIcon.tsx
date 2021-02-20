import React from "react";
import { theme } from "../../theme";
import { IconProps } from "../types";

const BinderIcon: React.FC<IconProps> = ({
  className = "binder-icon",
  color = theme.colors.iconColor,
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
      <path
        d="M4 7C2.89524 7 2 6.10048 2 5.00957C2 3.91866 2.89524 3 4 3C5.10476 3 6 3.89952 6 5.00957"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M4 13C2.89524 13 2 12.1005 2 11.0096C2 9.91866 2.89524 9 4 9C5.10476 9 6 9.89952 6 11.0096"
        stroke={color}
        strokeMiterlimit="10"
      />
      <path
        d="M4 3C4 2.44772 4.44772 2 5 2H12C12.5523 2 13 2.44772 13 3V13C13 13.5523 12.5523 14 12 14H5C4.44772 14 4 13.5523 4 13V3Z"
        stroke={color}
        strokeWidth="1.33"
      />
      <path d="M7.5 2V14.5" stroke={color} />
    </svg>
  );
};

export default BinderIcon;
