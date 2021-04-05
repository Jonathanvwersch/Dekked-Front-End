import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "./Icon.types";
import { ThemeContext } from "styled-components/macro";
import { Svg } from "./Icon.styles";

const BodyTextIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3.66602C6 4.21935 6.44667 4.66602 7 4.66602H9.33333V11.666C9.33333 12.2193 9.78 12.666 10.3333 12.666C10.8867 12.666 11.3333 12.2193 11.3333 11.666V4.66602H13.6667C14.22 4.66602 14.6667 4.21935 14.6667 3.66602C14.6667 3.11268 14.22 2.66602 13.6667 2.66602H7C6.44667 2.66602 6 3.11268 6 3.66602ZM3 7.99935H4V11.666C4 12.2193 4.44667 12.666 5 12.666C5.55333 12.666 6 12.2193 6 11.666V7.99935H7C7.55333 7.99935 8 7.55268 8 6.99935C8 6.44602 7.55333 5.99935 7 5.99935H3C2.44667 5.99935 2 6.44602 2 6.99935C2 7.55268 2.44667 7.99935 3 7.99935Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default BodyTextIcon;
