import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components";

const QuoteIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M9.33398 11.3337H11.334L12.6673 8.66699V4.66699H8.66732V8.66699H10.6673L9.33398 11.3337ZM4.00065 11.3337H6.00065L7.33398 8.66699V4.66699H3.33398V8.66699H5.33398L4.00065 11.3337Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default QuoteIcon;
