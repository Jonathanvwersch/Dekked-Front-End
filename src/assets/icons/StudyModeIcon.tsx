import { ThemeType } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Svg, IconProps } from "..";

const StudyModeIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} rotate={rotate} viewBox="0 0 16 16" fill="none">
      <path
        d="M14.0001 2.66675H2.00008C1.64646 2.66675 1.30732 2.80722 1.05727 3.05727C0.807224 3.30732 0.666748 3.64646 0.666748 4.00008V12.6667C0.666748 13.0204 0.807224 13.3595 1.05727 13.6096C1.30732 13.8596 1.64646 14.0001 2.00008 14.0001H14.0001C14.3537 14.0001 14.6928 13.8596 14.9429 13.6096C15.1929 13.3595 15.3334 13.0204 15.3334 12.6667V4.00008C15.3334 3.64646 15.1929 3.30732 14.9429 3.05727C14.6928 2.80722 14.3537 2.66675 14.0001 2.66675V2.66675ZM2.00008 12.6667V4.00008H7.33341V12.6667H2.00008ZM14.0001 12.6667H8.66675V4.00008H14.0001V12.6667ZM9.33341 6.33341H13.3334V7.33341H9.33341V6.33341ZM9.33341 8.00008H13.3334V9.00008H9.33341V8.00008ZM9.33341 9.66675H13.3334V10.6667H9.33341V9.66675Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default StudyModeIcon;
