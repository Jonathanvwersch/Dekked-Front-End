import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "../Icon.types";
import { ThemeContext } from "styled-components";
import { Svg } from "../Icon.styles";

const StudyQueueIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg
      size={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 0V15H9V0H6ZM9 2L13 15L16 14L12 1L9 2ZM2 2V15H5V2H2ZM0 16V18H18V16H0Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default StudyQueueIcon;
