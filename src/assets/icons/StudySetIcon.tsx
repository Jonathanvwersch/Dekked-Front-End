import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "../types";
import { ThemeContext } from "styled-components";
import { Svg } from "../styles";

const StudySetIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg rotate={rotate} size={size} viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#clip0)">
        <rect
          x="3.66667"
          y="2.66667"
          width="9.33667"
          height="12"
          rx="0.666667"
          stroke={iconColor}
          strokeWidth="1.33333"
        />
        <path
          d="M9.6665 0.666504H2.99984C2.26346 0.666504 1.6665 1.26346 1.6665 1.99984V9.6665"
          stroke={iconColor}
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </Svg>
  );
};

export default StudySetIcon;
