import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";

const ReturnIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M2.66797 6.66667L6.66797 2.66667L7.61464 3.61333L5.2213 6L12.668 6V14H11.3346V7.33333L5.2213 7.33333L7.61464 9.72L6.66797 10.6667L2.66797 6.66667Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default ReturnIcon;
