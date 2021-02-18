import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const DropDownArrowIcon: React.FC<IconProps> = ({
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
        d="M4.66797 6.66602L8.0013 9.99935L11.3346 6.66602H4.66797Z"
        fill={iconColour}
      />
    </svg>
  );
};

export default DropDownArrowIcon;
