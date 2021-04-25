import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { Svg, IconProps } from "..";

const DividerIcon: React.FC<IconProps & { strokeWidth?: string }> = ({
  color,
  size,
  rotate,
  strokeWidth,
}) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill={iconColor} rotate={rotate}>
      <line
        x1="8.15"
        y1="-6.55671e-09"
        x2="8.15"
        y2="16"
        stroke={iconColor}
        strokeWidth={strokeWidth ? strokeWidth : "0.3"}
      />
    </Svg>
  );
};

export default DividerIcon;
