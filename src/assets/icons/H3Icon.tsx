import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "./Icon.types";
import { ThemeContext } from "styled-components/macro";
import { Svg } from "./Icon.styles";

const H3Icon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M7.637 13.0007V3.66967H6.379V7.62067H1.758V3.67067H0.5V13.0007H1.758V8.72867H6.378V13.0007H7.637ZM11.262 8.72867H12.28C13.422 8.72867 14.215 9.39867 14.229 10.4027C14.242 11.4077 13.449 12.1397 12.219 12.1327C11.139 12.1257 10.366 11.5447 10.284 10.8127H9.108C9.177 12.1397 10.332 13.1987 12.191 13.1987C14.126 13.1987 15.534 12.0437 15.5 10.4097C15.473 8.89968 14.249 8.24967 13.463 8.16067V8.09267C14.167 7.96967 15.227 7.18267 15.186 5.86367C15.151 4.51067 14.01 3.46367 12.232 3.47867C10.359 3.48467 9.375 4.64067 9.334 5.83667H10.53C10.592 5.14667 11.241 4.53768 12.226 4.53768C13.224 4.53768 13.921 5.15967 13.921 6.06267C13.928 6.98467 13.203 7.65467 12.226 7.65467H11.262V8.72867Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default H3Icon;
