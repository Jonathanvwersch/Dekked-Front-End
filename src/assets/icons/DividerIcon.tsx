import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { Svg, IconProps } from "..";

const DividerIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill={iconColor}>
      <line
        x1="8.15"
        y1="-6.55671e-09"
        x2="8.15"
        y2="16"
        stroke="#2C2C31"
        strokeWidth="0.3"
      />
    </Svg>
  );
};

export default DividerIcon;
