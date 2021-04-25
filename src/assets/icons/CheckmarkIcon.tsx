import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { Svg, IconProps } from "..";

const CheckmarkIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M5.99986 13.6134L1.85986 9.47342L3.74653 7.58675L5.99986 9.84675L12.5865 3.25342L14.4732 5.14008L5.99986 13.6134Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default CheckmarkIcon;
