import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const DropDownArrowIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} rotate={rotate} viewBox="0 0 16 16" fill="none">
      <path
        d="M6.66797 11.333L10.0013 7.99967L6.66797 4.66634V11.333Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default DropDownArrowIcon;
