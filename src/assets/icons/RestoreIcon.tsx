import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";

const RestoreIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M8.66797 2C7.07667 2 5.55055 2.63214 4.42533 3.75736C3.30011 4.88258 2.66797 6.4087 2.66797 8H0.667969L3.2613 10.5933L3.30797 10.6867L6.0013 8H4.0013C4.0013 6.76232 4.49297 5.57534 5.36814 4.70017C6.24331 3.825 7.43029 3.33333 8.66797 3.33333C9.90565 3.33333 11.0926 3.825 11.9678 4.70017C12.843 5.57534 13.3346 6.76232 13.3346 8C13.3346 9.23768 12.843 10.4247 11.9678 11.2998C11.0926 12.175 9.90565 12.6667 8.66797 12.6667C7.3813 12.6667 6.21464 12.14 5.37464 11.2933L4.42797 12.24C4.98228 12.8004 5.64275 13.2447 6.37077 13.5469C7.09878 13.8491 7.87973 14.0031 8.66797 14C10.2593 14 11.7854 13.3679 12.9106 12.2426C14.0358 11.1174 14.668 9.5913 14.668 8C14.668 6.4087 14.0358 4.88258 12.9106 3.75736C11.7854 2.63214 10.2593 2 8.66797 2V2Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default RestoreIcon;
