import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const ErrorIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M7.96865 1.33334C4.30998 1.33334 1.33331 4.32401 1.33331 8.00001C1.33331 11.676 4.32398 14.6667 7.99998 14.6667C11.676 14.6667 14.6666 11.676 14.6666 8.00001C14.6666 4.32401 11.662 1.33334 7.96865 1.33334ZM7.99998 13.3333C5.05931 13.3333 2.66665 10.9407 2.66665 8.00001C2.66665 5.05934 5.04465 2.66668 7.96865 2.66668C10.9273 2.66668 13.3333 5.05934 13.3333 8.00001C13.3333 10.9407 10.9406 13.3333 7.99998 13.3333Z"
        fill={iconColor}
      />
      <path
        d="M7.33331 4.66666H8.66665V9.33332H7.33331V4.66666ZM7.33331 9.99999H8.66665V11.3333H7.33331V9.99999Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default ErrorIcon;
