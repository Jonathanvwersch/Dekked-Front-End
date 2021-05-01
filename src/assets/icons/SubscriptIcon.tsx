import React, { useContext } from "react";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../styles/theme";

const SubscriptIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 10.7179L7.97435 2M1 2L7.97435 10.7179L1 2Z"
        stroke={iconColor}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9487 13.3334H11.4615L14.5128 9.84618C14.6273 9.64583 14.7012 9.42489 14.7303 9.19598C14.7594 8.96707 14.7431 8.73467 14.6824 8.51204C14.6217 8.28942 14.5177 8.08094 14.3764 7.8985C14.2351 7.71605 14.0593 7.56323 13.8589 7.44874C13.6586 7.33426 13.4376 7.26035 13.2087 7.23125C12.9798 7.20215 12.7474 7.21842 12.5248 7.27914C12.3022 7.33985 12.0937 7.44382 11.9112 7.58511C11.7288 7.7264 11.576 7.90224 11.4615 8.10259"
        stroke={iconColor}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SubscriptIcon;
