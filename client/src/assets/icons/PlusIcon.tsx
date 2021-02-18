import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const PlusIcon: React.FC<IconProps> = ({ colour, size, rotate }) => {
  const classes = useStyles({ rotate });
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
        d="M12.6654 8.66732H8.66536V12.6673H7.33203V8.66732H3.33203V7.33398H7.33203V3.33398H8.66536V7.33398H12.6654V8.66732Z"
        fill={iconColour}
      />
    </svg>
  );
};

export default PlusIcon;
