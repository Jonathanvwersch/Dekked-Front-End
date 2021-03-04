import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const Divider: React.FC<IconProps> = ({ color, size, rotate }) => {
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
      fill={iconColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="8.15"
        y1="-6.55671e-09"
        x2="8.15"
        y2="16"
        stroke="#2C2C31"
        strokeWidth="0.3"
      />
    </svg>
  );
};

export default Divider;
