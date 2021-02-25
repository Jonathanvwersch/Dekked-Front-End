import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const StudySetIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const classes = useStyles({ rotate });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <svg
      className={classes.icon}
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${parseInt(iconSize)} ${parseInt(iconSize)}`}
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
          stroke={color}
          strokeWidth="1.33333"
        />
        <path
          d="M9.6665 0.666504H2.99984C2.26346 0.666504 1.6665 1.26346 1.6665 1.99984V9.6665"
          stroke={iconColor}
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
