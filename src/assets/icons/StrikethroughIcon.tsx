import { ThemeType } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const StrikethroughIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} rotate={rotate} viewBox="0 0 16 16" fill="none">
      <path
        d="M2 9.33341H14V8.00008H2V9.33341ZM3.33333 2.66675V4.66675H6.66667V6.66675H9.33333V4.66675H12.6667V2.66675H3.33333ZM6.66667 12.6667H9.33333V10.6667H6.66667V12.6667Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default StrikethroughIcon;
