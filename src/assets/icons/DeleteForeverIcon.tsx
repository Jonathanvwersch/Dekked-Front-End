import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { Svg, IconProps } from "..";

const DeleteForeverIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M3.9987 12.6667C3.9987 13.4 4.5987 14 5.33203 14H10.6654C11.3987 14 11.9987 13.4 11.9987 12.6667V4.66667H3.9987V12.6667ZM5.6387 7.92L6.5787 6.98L7.9987 8.39333L9.41203 6.98L10.352 7.92L8.9387 9.33333L10.352 10.7467L9.41203 11.6867L7.9987 10.2733L6.58536 11.6867L5.64536 10.7467L7.0587 9.33333L5.6387 7.92ZM10.332 2.66667L9.66536 2H6.33203L5.66536 2.66667H3.33203V4H12.6654V2.66667H10.332Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default DeleteForeverIcon;
