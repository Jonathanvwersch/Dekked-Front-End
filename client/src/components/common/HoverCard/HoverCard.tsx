// Wrapper component for whenever you want to add a hover and active state to another component
import React from "react";
import styled from "styled-components";

interface HoverCardProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
  backgroundColor?: string;
  handleClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  return (
    <StyledHoverCard
      role="button"
      tab-index="0"
      onClick={props.handleClick}
      {...props}
    >
      {children}
    </StyledHoverCard>
  );
};

const StyledHoverCard = styled.div<HoverCardProps>`
  width: ${({ width }) => (width ? width : "100%")};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.colors.secondary};
  cursor: pointer;
  user-select: none;
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:focus {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.hover.active};
  }
`;

export default HoverCard;
