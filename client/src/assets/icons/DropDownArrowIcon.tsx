import React from "react";
import { theme } from "../../theme";
import { createUseStyles } from "react-jss";
import { IconProps, ORIENTATION } from "../types";

const DropDownArrowIcon: React.FC<IconProps> = ({
  colour = theme.colours.offBlack,
  size = theme.icons.size,
  orientation = ORIENTATION.DOWN, // Arrow defaults to pointing down
}) => {
  const useStyles = createUseStyles({
    DropDownArrowLeftIcon: {
      transform: "rotate(90deg)",
    },
    DropDownArrowRightIcon: {
      transform: "rotate(-90deg)",
    },
    DropDownArrowUpIcon: {
      transform: "rotate(180deg)",
    },
  });
  const classes = useStyles();

  const arrowOrientation = () => {
    if (orientation === ORIENTATION.RIGHT)
      return classes.DropDownArrowRightIcon;
    else if (orientation === ORIENTATION.LEFT)
      return classes.DropDownArrowLeftIcon;
    else if (orientation === ORIENTATION.UP) return classes.DropDownArrowUpIcon;
    else return "DropDownArrowDownIcon";
  };
  return (
    <svg
      className={arrowOrientation()}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66797 6.66602L8.0013 9.99935L11.3346 6.66602H4.66797Z"
        fill={colour}
      />
    </svg>
  );
};

export default DropDownArrowIcon;
