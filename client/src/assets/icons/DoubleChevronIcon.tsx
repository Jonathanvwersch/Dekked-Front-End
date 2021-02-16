import React from "react";
import { createUseStyles } from "react-jss";
import { theme } from "../../theme";
import { IconProps, ORIENTATION } from "../types";

const DoubleChevronIcon: React.FC<IconProps> = ({
  colour = theme.colours.offBlack,
  size = theme.icons.size,
  orientation = ORIENTATION.LEFT, // Chevron defaults to pointing to left
}) => {
  const useStyles = createUseStyles({
    DoubleChevronRightIcon: {
      transform: "rotate(180deg)",
    },
    DoubleChevronUpIcon: {
      transform: "rotate(90deg)",
    },
    DoubleChevronDownIcon: {
      transform: "rotate(-90deg)",
    },
  });

  const classes = useStyles();
  const arrowOrientation = () => {
    if (orientation === ORIENTATION.RIGHT)
      return classes.DoubleChevronRightIcon;
    else if (orientation === ORIENTATION.DOWN)
      return classes.DoubleChevronDownIcon;
    else if (orientation === ORIENTATION.UP) return classes.DoubleChevronUpIcon;
    else return "DoubleChevronLeftIcon";
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
        d="M8.27203 11.06L5.2187 8L8.27203 4.94L7.33203 4L3.33203 8L7.33203 12L8.27203 11.06Z"
        fill={colour}
      />
      <path
        d="M13.2134 11.06L10.1601 8L13.2134 4.94L12.2734 4L8.27344 8L12.2734 12L13.2134 11.06Z"
        fill={colour}
      />
    </svg>
  );
};

export default DoubleChevronIcon;
