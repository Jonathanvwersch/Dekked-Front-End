import React from "react";
import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const BoldIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
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
        d="M10.4013 7.19268C11.048 6.74602 11.5013 6.01268 11.5013 5.33268C11.5013 3.82602 10.3346 2.66602 8.83464 2.66602H5.33464C4.96797 2.66602 4.66797 2.96602 4.66797 3.33268V11.3327C4.66797 11.6993 4.96797 11.9993 5.33464 11.9993H9.18797C10.568 11.9993 11.828 10.8727 11.8346 9.48601C11.8413 8.46601 11.268 7.59268 10.4013 7.19268ZM6.66797 4.33268H8.66797C9.2213 4.33268 9.66797 4.77935 9.66797 5.33268C9.66797 5.88602 9.2213 6.33268 8.66797 6.33268H6.66797V4.33268ZM9.0013 10.3327H6.66797V8.33268H9.0013C9.55464 8.33268 10.0013 8.77935 10.0013 9.33268C10.0013 9.88602 9.55464 10.3327 9.0013 10.3327Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default BoldIcon;
