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
        d="M6.11466 10.828L8 8.94266L9.88533 10.828L10.828 9.88533L8.94266 8L10.828 6.11466L9.88533 5.172L8 7.05733L6.11466 5.172L5.172 6.11466L7.05733 8L5.172 9.88533L6.11466 10.828Z"
        fill={iconColor}
      />
      <path
        d="M8.00001 14.6667C11.676 14.6667 14.6667 11.676 14.6667 8.00004C14.6667 4.32404 11.676 1.33337 8.00001 1.33337C4.32401 1.33337 1.33334 4.32404 1.33334 8.00004C1.33334 11.676 4.32401 14.6667 8.00001 14.6667ZM8.00001 2.66671C10.9407 2.66671 13.3333 5.05937 13.3333 8.00004C13.3333 10.9407 10.9407 13.3334 8.00001 13.3334C5.05934 13.3334 2.66668 10.9407 2.66668 8.00004C2.66668 5.05937 5.05934 2.66671 8.00001 2.66671Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default ClearIcon;
