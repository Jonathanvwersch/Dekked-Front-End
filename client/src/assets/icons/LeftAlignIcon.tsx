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
        d="M2 12.6667H14V14H2V12.6667ZM2 4.66667H10V6H2V4.66667ZM2 2H14V3.33333H2V2ZM2 10H10V11.3333H2V10ZM2 7.33333H14V8.66667H2V7.33333Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default LeftAlignIcon;
