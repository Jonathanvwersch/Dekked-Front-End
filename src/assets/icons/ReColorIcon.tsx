import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "../types";
import { Svg } from "../styles";
import { ThemeContext } from "styled-components";

const ReColorIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg
      size={size}
      rotate={rotate}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0013 2.66732V2.00065C12.0013 1.63398 11.7013 1.33398 11.3346 1.33398H3.33464C2.96797 1.33398 2.66797 1.63398 2.66797 2.00065V4.66732C2.66797 5.03398 2.96797 5.33398 3.33464 5.33398H11.3346C11.7013 5.33398 12.0013 5.03398 12.0013 4.66732V4.00065H12.668V6.66732H6.0013V14.0007C6.0013 14.3673 6.3013 14.6673 6.66797 14.6673H8.0013C8.36797 14.6673 8.66797 14.3673 8.66797 14.0007V8.00065H14.0013V2.66732H12.0013ZM10.668 4.00065H4.0013V2.66732H10.668V4.00065Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default ReColorIcon;
