import { ThemeType } from "../../theme";
import { IconProps } from "../types";
import { useTheme } from "react-jss";

const PlusIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useTheme();
  const iconSize = size ? size : theme.icons.size;
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <svg
      className="plus-icon"
      width={iconSize}
      height={iconSize}
      viewBox={`0 0 ${parseInt(iconSize)} ${parseInt(iconSize)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6654 8.66732H8.66536V12.6673H7.33203V8.66732H3.33203V7.33398H7.33203V3.33398H8.66536V7.33398H12.6654V8.66732Z"
        fill={iconColor}
      />
    </svg>
  );
};

export default PlusIcon;
