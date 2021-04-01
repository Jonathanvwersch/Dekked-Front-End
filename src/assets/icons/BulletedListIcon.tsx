import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { IconProps } from "./Icon.types";
import { ThemeContext } from "styled-components";
import { Svg } from "./Icon.styles";

const BulletedListIcon: React.FC<IconProps> = ({ size, color }) => {
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
        d="M2.66797 7C2.11464 7 1.66797 7.44667 1.66797 8C1.66797 8.55333 2.11464 9 2.66797 9C3.2213 9 3.66797 8.55333 3.66797 8C3.66797 7.44667 3.2213 7 2.66797 7ZM2.66797 3C2.11464 3 1.66797 3.44667 1.66797 4C1.66797 4.55333 2.11464 5 2.66797 5C3.2213 5 3.66797 4.55333 3.66797 4C3.66797 3.44667 3.2213 3 2.66797 3ZM2.66797 11C2.11464 11 1.66797 11.4533 1.66797 12C1.66797 12.5467 2.1213 13 2.66797 13C3.21464 13 3.66797 12.5467 3.66797 12C3.66797 11.4533 3.2213 11 2.66797 11ZM4.66797 12.6667H14.0013V11.3333H4.66797V12.6667ZM4.66797 8.66667H14.0013V7.33333H4.66797V8.66667ZM4.66797 3.33333V4.66667H14.0013V3.33333H4.66797Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default BulletedListIcon;
