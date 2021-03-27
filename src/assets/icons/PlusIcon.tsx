import { ThemeType } from "../../styles/theme";
import { IconProps } from "../Icon.types";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Svg } from "../Icon.styles";

const PlusIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M12.6654 8.66732H8.66536V12.6673H7.33203V8.66732H3.33203V7.33398H7.33203V3.33398H8.66536V7.33398H12.6654V8.66732Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default PlusIcon;
