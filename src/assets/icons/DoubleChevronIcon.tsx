import { ThemeType } from "../../styles/theme";
import { IconProps } from "./Icon.types";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Svg } from "./Icon.styles";

const DoubleChevronIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} rotate={rotate} viewBox="0 0 16 16" fill="none">
      <path
        d="M8.27203 11.06L5.2187 8L8.27203 4.94L7.33203 4L3.33203 8L7.33203 12L8.27203 11.06Z"
        fill={iconColor}
      />
      <path
        d="M13.2134 11.06L10.1601 8L13.2134 4.94L12.2734 4L8.27344 8L12.2734 12L13.2134 11.06Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default DoubleChevronIcon;
