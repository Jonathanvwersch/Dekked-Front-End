import React from "react";
import styled from "styled-components";

interface AvatarProps {
  diameter?: string;
  backgroundColor?: string;
  fontColor?: string;
  handleClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({ children, ...props }) => {
  return (
    <StyledAvatar onClick={props.handleClick} {...props}>
      {children}
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div<AvatarProps>`
  cursor: ${({ handleClick }) => (handleClick ? "pointer" : "auto")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
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

  &:hover {
    transform: ${({ handleClick }) => handleClick && "scale(1.1)"};
  }
`;

export default Avatar;
