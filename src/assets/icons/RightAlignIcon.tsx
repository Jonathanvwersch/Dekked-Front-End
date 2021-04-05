import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "./Icon.types";
import { ThemeContext } from "styled-components/macro";
import { Svg } from "./Icon.styles";

const LeftAlignIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 14H14V12.6667H2V14ZM6 11.3333H14V10H6V11.3333ZM2 8.66667H14V7.33333H2V8.66667ZM6 6H14V4.66667H6V6ZM2 2V3.33333H14V2H2Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default LeftAlignIcon;
