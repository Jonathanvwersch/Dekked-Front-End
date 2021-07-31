import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components";

const FullScreebIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.33203 3.33337H6.66536V4.66671H4.66536V6.66671H3.33203V3.33337ZM9.33203 3.33337H12.6654V6.66671H11.332V4.66671H9.33203V3.33337ZM11.332 9.33337H12.6654V12.6667H9.33203V11.3334H11.332V9.33337ZM6.66536 11.3334V12.6667H3.33203V9.33337H4.66536V11.3334H6.66536Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default FullScreebIcon;
