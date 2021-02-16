import React from "react";
import { theme } from "../../theme";
import { IconProps } from "../types";

const FolderIcon: React.FC<IconProps> = ({
  className = "folder-icon",
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
        d="M6.1135 3.99984L7.44683 5.33317H13.3335V11.9998H2.66683V3.99984H6.1135ZM6.66683 2.6665H2.66683C1.9335 2.6665 1.34016 3.2665 1.34016 3.99984L1.3335 11.9998C1.3335 12.7332 1.9335 13.3332 2.66683 13.3332H13.3335C14.0668 13.3332 14.6668 12.7332 14.6668 11.9998V5.33317C14.6668 4.59984 14.0668 3.99984 13.3335 3.99984H8.00016L6.66683 2.6665Z"
        fill={colour}
      />
    </svg>
  );
};

export default FolderIcon;
