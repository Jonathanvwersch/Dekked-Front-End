import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const LeftAlignIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const classes = useStyles({ rotate });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <svg
      className={classes.icon}
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66667 10V11.3333H11.3333V10H4.66667ZM2 14H14V12.6667H2V14ZM2 8.66667H14V7.33333H2V8.66667ZM4.66667 4.66667V6H11.3333V4.66667H4.66667ZM2 2V3.33333H14V2H2Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default LeftAlignIcon;
