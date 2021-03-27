import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "../Icon.types";
import { Svg } from "../Icon.styles";
import { ThemeContext } from "styled-components";

const LeftAlignIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16">
      <path
        d="M2 12.6667H14V14H2V12.6667ZM2 4.66667H10V6H2V4.66667ZM2 2H14V3.33333H2V2ZM2 10H10V11.3333H2V10ZM2 7.33333H14V8.66667H2V7.33333Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default LeftAlignIcon;
