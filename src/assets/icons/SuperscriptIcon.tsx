import React, { useContext } from "react";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../styles/theme";

const SupersciptIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M1 13.33L7.975 4.62503M1 4.62503L7.975 13.33L1 4.62503Z"
        stroke={iconColor}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.95 8.10702H11.4625L14.5141 4.62504C14.6286 4.42499 14.7025 4.20438 14.7316 3.97581C14.7607 3.74724 14.7444 3.51519 14.6837 3.29289C14.623 3.0706 14.519 2.86243 14.3777 2.68026C14.2364 2.49809 14.0605 2.34549 13.8602 2.23118C13.4555 2.00031 12.9756 1.93939 12.5259 2.06183C12.0763 2.18426 11.6938 2.48003 11.4625 2.88405"
        stroke={iconColor}
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SupersciptIcon;
