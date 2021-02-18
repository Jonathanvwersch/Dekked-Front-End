import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const DoubleChevronIcon: React.FC<IconProps> = ({
  colour,
  size,
  rotate,
  active = true,
}) => {
  const classes = useStyles({ rotate, active });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColour = colour ? colour : theme.colours.offBlack;

  return (
    <svg
      className={classes.icon}
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${iconSize} ${iconSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.27203 11.06L5.2187 8L8.27203 4.94L7.33203 4L3.33203 8L7.33203 12L8.27203 11.06Z"
        fill={iconColour}
      />
      <path
        d="M13.2134 11.06L10.1601 8L13.2134 4.94L12.2734 4L8.27344 8L12.2734 12L13.2134 11.06Z"
        fill={iconColour}
      />
    </svg>
  );
};

export default DoubleChevronIcon;
