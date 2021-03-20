import React, { useContext } from "react";
import { IconProps } from "../types";
import { ThemeContext } from "styled-components";
import { ThemeType } from "../../styles/theme";
import { Svg } from "../styles";

const LogoIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M7.28821 10.0128C7.81073 10.0119 9.13211 10.0097 10.1453 9.70384C10.628 9.50222 11.0667 9.20715 11.4362 8.8355C11.8056 8.46385 12.0987 8.02288 12.2987 7.53777C12.4986 7.05266 12.6016 6.53291 12.6016 6.0082C12.6016 5.48348 12.4986 4.96409 12.2987 4.47966C12.0987 3.99522 11.8056 3.55524 11.4362 3.18484C11.0667 2.81443 10.628 2.52086 10.1453 2.32087C9.15637 1.9112 7.81073 2.02067 7.28821 2.02155"
        stroke={iconColor}
        strokeWidth="1.60072"
      />
      <path
        d="M8.31336 5.98734C7.79083 5.98821 6.46945 5.9904 5.45627 6.29623C4.97352 6.49783 4.53489 6.79289 4.16541 7.16453C3.79593 7.53617 3.50284 7.97714 3.30288 8.46224C3.10292 8.94734 3 9.46709 3 9.9918C3 10.5165 3.10292 11.0359 3.30288 11.5204C3.50284 12.0048 3.79593 12.4448 4.16541 12.8152C4.53489 13.1856 4.97352 13.4792 5.45627 13.6792C6.44519 14.0889 7.79083 13.9795 8.31336 13.9786"
        stroke={iconColor}
        strokeWidth="1.60072"
      />
    </Svg>
  );
};

export default LogoIcon;
