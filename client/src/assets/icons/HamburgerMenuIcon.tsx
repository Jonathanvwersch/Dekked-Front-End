import React from "react";
import { useTheme } from "react-jss";
import { ThemeType } from "../../theme";
import { useStyles } from "../styles";
import { IconProps } from "../types";

const HamburgerMenuIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
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
        d="M2 12H14V10.6667H2V12ZM2 8.66667H14V7.33333H2V8.66667ZM2 4V5.33333H14V4H2Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default HamburgerMenuIcon;
