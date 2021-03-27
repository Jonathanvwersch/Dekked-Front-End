import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "../Icon.types";
import { ThemeContext } from "styled-components";
import { Svg } from "../Icon.styles";

const H2Icon: React.FC<IconProps> = ({ color, size }) => {
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
        d="M7.638 13.0005V3.66952H6.38V7.62052H1.759V3.67052H0.5V13.0005H1.758V8.72852H6.378V13.0005H7.637H7.638ZM10.66 6.26752V6.21952C10.66 5.33052 11.29 4.55152 12.376 4.55152C13.333 4.55152 14.051 5.15952 14.051 6.12352C14.051 6.97852 13.497 7.62752 12.984 8.20852L9.471 12.2075V13.0005H15.5V11.9065H11.255V11.8315L13.736 8.98752C14.611 7.98952 15.322 7.20352 15.322 6.03452C15.322 4.57152 14.167 3.47852 12.403 3.47852C10.462 3.47852 9.437 4.80452 9.437 6.21852V6.26752H10.66Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default H2Icon;
