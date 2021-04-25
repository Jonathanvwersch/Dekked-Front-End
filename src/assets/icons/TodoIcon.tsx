import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { ThemeContext } from "styled-components/macro";
import { Svg, IconProps } from "..";

const TodoIcon: React.FC<IconProps> = ({ color, size }) => {
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
        d="M14 12.6667V11.3334H5.33333V12.6667H14ZM14 8.66675V7.33341H5.33333V8.66675H14ZM5.33333 4.66675H14V3.33341H5.33333V4.66675ZM2.66667 3.33341V4.66675H4V3.33341H2.66667ZM2 3.33341C2 3.1566 2.07024 2.98703 2.19526 2.86201C2.32029 2.73699 2.48986 2.66675 2.66667 2.66675H4C4.17681 2.66675 4.34638 2.73699 4.4714 2.86201C4.59643 2.98703 4.66667 3.1566 4.66667 3.33341V4.66675C4.66667 4.84356 4.59643 5.01313 4.4714 5.13815C4.34638 5.26318 4.17681 5.33341 4 5.33341H2.66667C2.48986 5.33341 2.32029 5.26318 2.19526 5.13815C2.07024 5.01313 2 4.84356 2 4.66675V3.33341ZM2.66667 7.33341V8.66675H4V7.33341H2.66667ZM2 7.33341C2 7.1566 2.07024 6.98703 2.19526 6.86201C2.32029 6.73699 2.48986 6.66675 2.66667 6.66675H4C4.17681 6.66675 4.34638 6.73699 4.4714 6.86201C4.59643 6.98703 4.66667 7.1566 4.66667 7.33341V8.66675C4.66667 8.84356 4.59643 9.01313 4.4714 9.13815C4.34638 9.26318 4.17681 9.33341 4 9.33341H2.66667C2.48986 9.33341 2.32029 9.26318 2.19526 9.13815C2.07024 9.01313 2 8.84356 2 8.66675V7.33341ZM2.66667 11.3334V12.6667H4V11.3334H2.66667ZM2 11.3334C2 11.1566 2.07024 10.987 2.19526 10.862C2.32029 10.737 2.48986 10.6667 2.66667 10.6667H4C4.17681 10.6667 4.34638 10.737 4.4714 10.862C4.59643 10.987 4.66667 11.1566 4.66667 11.3334V12.6667C4.66667 12.8436 4.59643 13.0131 4.4714 13.1382C4.34638 13.2632 4.17681 13.3334 4 13.3334H2.66667C2.48986 13.3334 2.32029 13.2632 2.19526 13.1382C2.07024 13.0131 2 12.8436 2 12.6667V11.3334Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default TodoIcon;
