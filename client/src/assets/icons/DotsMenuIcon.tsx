import { useTheme } from "react-jss";
import { ThemeType } from "../../theme";
import { useStyles } from "../styles";
import { IconProps } from "../types";

const DotsMenuIcon: React.FC<IconProps> = ({ colour, size, rotate }) => {
  const classes = useStyles({ rotate });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColour = colour ? colour : theme.colours.offBlack;
  return (
    <svg
      className={classes.icon}
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${parseInt(iconSize)} ${parseInt(iconSize)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.0013 6.66602C3.26797 6.66602 2.66797 7.26602 2.66797 7.99935C2.66797 8.73268 3.26797 9.33268 4.0013 9.33268C4.73464 9.33268 5.33464 8.73268 5.33464 7.99935C5.33464 7.26602 4.73464 6.66602 4.0013 6.66602ZM12.0013 6.66602C11.268 6.66602 10.668 7.26602 10.668 7.99935C10.668 8.73268 11.268 9.33268 12.0013 9.33268C12.7346 9.33268 13.3346 8.73268 13.3346 7.99935C13.3346 7.26602 12.7346 6.66602 12.0013 6.66602ZM8.0013 6.66602C7.26797 6.66602 6.66797 7.26602 6.66797 7.99935C6.66797 8.73268 7.26797 9.33268 8.0013 9.33268C8.73463 9.33268 9.33463 8.73268 9.33463 7.99935C9.33463 7.26602 8.73463 6.66602 8.0013 6.66602Z"
        fill={iconColour}
      />
    </svg>
  );
};

export default DotsMenuIcon;
