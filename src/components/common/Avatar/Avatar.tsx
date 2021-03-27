import React from "react";
import styled from "styled-components";

interface AvatarProps {
  diameter?: string;
  backgroundColor?: string;
  fontColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  return <StyledAvatar>{children}</StyledAvatar>;
};

const StyledAvatar = styled.div<AvatarProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  height: ${({ diameter, theme }) =>
    diameter ? diameter : theme.spacers.size32};
  width: ${({ diameter, theme }) =>
    diameter ? diameter : theme.spacers.size32};
  min-height: ${({ diameter, theme }) =>
    diameter ? diameter : theme.spacers.size32};
  min-width: ${({ diameter, theme }) =>
    diameter ? diameter : theme.spacers.size32};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.primary};
  color: ${({ fontColor }) => (fontColor ? fontColor : "white")};
`;

export default Avatar;
