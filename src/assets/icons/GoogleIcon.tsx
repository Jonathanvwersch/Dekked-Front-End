import React from "react";

import { Svg, IconProps } from "..";

const GoogleIcon: React.FC<IconProps> = ({ size }) => {
  return (
    <Svg size={size} viewBox="0 0 16 16" fill="none">
      <path
        d="M14.537 6.69434H14V6.66668H8.00004V9.33334H11.7677C11.218 10.8857 9.74104 12 8.00004 12C5.79104 12 4.00004 10.209 4.00004 8.00001C4.00004 5.79101 5.79104 4.00001 8.00004 4.00001C9.01971 4.00001 9.94737 4.38468 10.6537 5.01301L12.5394 3.12734C11.3487 2.01768 9.75604 1.33334 8.00004 1.33334C4.31837 1.33334 1.33337 4.31834 1.33337 8.00001C1.33337 11.6817 4.31837 14.6667 8.00004 14.6667C11.6817 14.6667 14.6667 11.6817 14.6667 8.00001C14.6667 7.55301 14.6207 7.11668 14.537 6.69434Z"
        fill="#FFC107"
      />
      <path
        d="M2.10205 4.89701L4.29238 6.50334C4.88505 5.03601 6.32038 4.00001 8.00005 4.00001C9.01972 4.00001 9.94738 4.38468 10.6537 5.01301L12.5394 3.12734C11.3487 2.01768 9.75605 1.33334 8.00005 1.33334C5.43938 1.33334 3.21872 2.77901 2.10205 4.89701Z"
        fill="#FF3D00"
      />
      <path
        d="M7.99994 14.6667C9.72194 14.6667 11.2866 14.0077 12.4696 12.936L10.4063 11.19C9.71446 11.7161 8.86909 12.0007 7.99994 12C6.26594 12 4.79361 10.8943 4.23894 9.35132L2.06494 11.0263C3.16827 13.1853 5.40894 14.6667 7.99994 14.6667Z"
        fill="#4CAF50"
      />
      <path
        d="M14.537 6.69432H14V6.66666H8V9.33332H11.7677C11.5047 10.0721 11.0311 10.7177 10.4053 11.1903L10.4063 11.1897L12.4697 12.9357C12.3237 13.0683 14.6667 11.3333 14.6667 7.99999C14.6667 7.55299 14.6207 7.11666 14.537 6.69432Z"
        fill="#1976D2"
      />
    </Svg>
  );
};

export default GoogleIcon;
