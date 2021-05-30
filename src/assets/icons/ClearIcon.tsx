import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const ClearIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} rotate={rotate} viewBox="0 0 16 16" fill="none">
      <path
        d="M10 6L6 10M10 10L6 6L10 10Z"
        stroke={iconColor}
        strokeWidth="1.33333"
        strokeLinecap="round"
      />
      <path
        d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00004C14.6667 4.31814 11.6819 1.33337 8.00001 1.33337C4.31811 1.33337 1.33334 4.31814 1.33334 8.00004C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
        stroke={iconColor}
        strokeWidth="1.33333"
      />
    </Svg>
  );
};

export default ClearIcon;
