import React, { useContext } from "react";
import { ThemeType } from "../../styles/theme";
import { Svg, IconProps } from "..";

import { ThemeContext } from "styled-components/macro";

const SettingsIcon: React.FC<IconProps> = ({ color, size }) => {
  const theme: ThemeType = useContext(ThemeContext);
  const iconColor = color ? color : theme.colors.iconColor;

  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M12.759 8.62628C12.7857 8.42628 12.799 8.21961 12.799 7.99961C12.799 7.78628 12.7857 7.57294 12.7523 7.37294L14.1057 6.31961C14.164 6.27154 14.2038 6.20474 14.2184 6.13059C14.233 6.05644 14.2214 5.97952 14.1857 5.91294L12.9057 3.69961C12.868 3.63265 12.8078 3.58119 12.7358 3.55435C12.6638 3.52751 12.5847 3.52701 12.5123 3.55294L10.919 4.19294C10.5857 3.93961 10.2323 3.72628 9.839 3.56628L9.599 1.87294C9.58719 1.79663 9.54841 1.72708 9.48969 1.67693C9.43098 1.62677 9.35622 1.59934 9.279 1.59961H6.719C6.559 1.59961 6.43233 1.71294 6.40567 1.87294L6.16567 3.56628C5.77233 3.72628 5.41233 3.94628 5.08567 4.19294L3.49233 3.55294C3.34567 3.49961 3.179 3.55294 3.099 3.69961L1.82567 5.91294C1.74567 6.05294 1.77233 6.22628 1.90567 6.31961L3.259 7.37294C3.22567 7.57294 3.199 7.79294 3.199 7.99961C3.199 8.20628 3.21233 8.42628 3.24567 8.62628L1.89233 9.67961C1.83402 9.72768 1.79417 9.79448 1.77958 9.86863C1.76499 9.94279 1.77657 10.0197 1.81233 10.0863L3.09233 12.2996C3.17233 12.4463 3.339 12.4929 3.48567 12.4463L5.079 11.8063C5.41233 12.0596 5.76567 12.2729 6.159 12.4329L6.399 14.1263C6.43233 14.2863 6.559 14.3996 6.719 14.3996H9.279C9.439 14.3996 9.57233 14.2863 9.59233 14.1263L9.83233 12.4329C10.2257 12.2729 10.5857 12.0596 10.9123 11.8063L12.5057 12.4463C12.6523 12.4996 12.819 12.4463 12.899 12.2996L14.179 10.0863C14.259 9.93961 14.2257 9.77294 14.099 9.67961L12.759 8.62628ZM7.999 10.3996C6.679 10.3996 5.599 9.31961 5.599 7.99961C5.599 6.67961 6.679 5.59961 7.999 5.59961C9.319 5.59961 10.399 6.67961 10.399 7.99961C10.399 9.31961 9.319 10.3996 7.999 10.3996Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default SettingsIcon;
