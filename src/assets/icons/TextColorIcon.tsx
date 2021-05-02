import React, { useContext } from "react";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../styles/theme";

const TextColorIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M14.125 12.75H1.875C1.80625 12.75 1.75 12.8062 1.75 12.875V14.125C1.75 14.1938 1.80625 14.25 1.875 14.25H14.125C14.1938 14.25 14.25 14.1938 14.25 14.125V12.875C14.25 12.8062 14.1938 12.75 14.125 12.75ZM3.96406 11.5H5.29219C5.35781 11.5 5.41719 11.4578 5.4375 11.3938L6.27656 8.8H9.70156L10.5328 11.3938C10.5531 11.4563 10.6109 11.5 10.6781 11.5H12.0703C12.0875 11.5 12.1047 11.4969 12.1203 11.4922C12.1392 11.4857 12.1567 11.4755 12.1717 11.4622C12.1866 11.449 12.1988 11.4329 12.2076 11.4148C12.2163 11.3968 12.2213 11.3773 12.2224 11.3573C12.2236 11.3373 12.2207 11.3173 12.2141 11.2984L8.9625 1.85312C8.95196 1.8233 8.93253 1.79742 8.90682 1.77898C8.88112 1.76054 8.85038 1.75043 8.81875 1.75H7.22031C7.15469 1.75 7.09687 1.79062 7.07656 1.85312L3.82031 11.2984C3.81406 11.3141 3.8125 11.3312 3.8125 11.3484C3.81094 11.4312 3.87969 11.5 3.96406 11.5V11.5ZM7.9625 3.43594H8.02656L9.33594 7.55781H6.63906L7.9625 3.43594V3.43594Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default TextColorIcon;
