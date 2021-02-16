import React from "react";
import { theme } from "../../theme";
import { IconProps } from "../types";

const DropDownArrowIcon: React.FC<IconProps> = ({
  className = "dropDownArrow-icon",
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
      <path
        d="M4.66797 6.66602L8.0013 9.99935L11.3346 6.66602H4.66797Z"
        fill={colour}
      />
    </svg>
  );
};

export default DropDownArrowIcon;
