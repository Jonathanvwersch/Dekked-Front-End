// Wrapper component for whenever you want to add a hover and active state to another component
import React from "react";
import styled from "styled-components";

interface HoverCardProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
  backgroundColor?: string;
  handleClick?: Function;
  padding?: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  return (
    <StyledHoverCard
      role="button"
      tab-index="0"
      onClick={(event: any) => {
        props.handleClick && props.handleClick(event);
      }}
      {...props}
    >
      {children}
    </StyledHoverCard>
  );
};

const StyledHoverCard = styled.div<HoverCardProps>`
  width: ${({ width }) => (width ? width : "100%")};
  padding: ${({ padding }) => padding};
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
