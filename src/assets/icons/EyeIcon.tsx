import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const EyeIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg color={color} size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M7.99999 6C7.46956 6 6.96085 6.21071 6.58578 6.58579C6.2107 6.96086 5.99999 7.46957 5.99999 8C5.99999 8.53043 6.2107 9.03914 6.58578 9.41421C6.96085 9.78929 7.46956 10 7.99999 10C8.53042 10 9.03913 9.78929 9.4142 9.41421C9.78928 9.03914 9.99999 8.53043 9.99999 8C9.99999 7.46957 9.78928 6.96086 9.4142 6.58579C9.03913 6.21071 8.53042 6 7.99999 6ZM7.99999 11.3333C7.11594 11.3333 6.26809 10.9821 5.64297 10.357C5.01785 9.7319 4.66666 8.88406 4.66666 8C4.66666 7.11595 5.01785 6.2681 5.64297 5.64298C6.26809 5.01786 7.11594 4.66667 7.99999 4.66667C8.88405 4.66667 9.73189 5.01786 10.357 5.64298C10.9821 6.2681 11.3333 7.11595 11.3333 8C11.3333 8.88406 10.9821 9.7319 10.357 10.357C9.73189 10.9821 8.88405 11.3333 7.99999 11.3333V11.3333ZM7.99999 3C4.66666 3 1.81999 5.07333 0.666656 8C1.81999 10.9267 4.66666 13 7.99999 13C11.3333 13 14.18 10.9267 15.3333 8C14.18 5.07333 11.3333 3 7.99999 3Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default EyeIcon;