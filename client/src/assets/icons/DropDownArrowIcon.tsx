import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const DropDownArrowIcon: React.FC<IconProps> = ({ colour, size, rotate }) => {
  const classes = useStyles({ rotate });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColour = colour ? colour : theme.colours.offBlack;

  return (
    <svg
      className={classes.icon}
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${parseInt(iconSize)} ${parseInt(iconSize)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.66797 11.333L10.0013 7.99967L6.66797 4.66634V11.333Z"
        fill={iconColour}
      />
    </svg>
  );
};

export default DropDownArrowIcon;
