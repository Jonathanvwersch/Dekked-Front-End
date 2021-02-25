import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useStyles } from "../styles";
import { useTheme } from "react-jss";

const DoubleChevronIcon: React.FC<IconProps> = ({ color, size, rotate }) => {
  const classes = useStyles({ rotate });
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColor = color ? color : theme.colors.iconColor;

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
        d="M12.6654 4.27398L11.7254 3.33398L7.9987 7.06065L4.27203 3.33398L3.33203 4.27398L7.0587 8.00065L3.33203 11.7273L4.27203 12.6673L7.9987 8.94065L11.7254 12.6673L12.6654 11.7273L8.9387 8.00065L12.6654 4.27398Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default DoubleChevronIcon;
