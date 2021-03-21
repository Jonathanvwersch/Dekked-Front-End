// Wrapper component for whenever you want to add a hover and active state to another component
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface HoverCardProps {
  width?: string;
  height?: string;
  className?: string;
  borderRadius?: string;
  backgroundColor?: string;
  handleClick?: (args: any) => any;
  padding?: string;
  activeIndex?: number;
  index?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (cardRef && props.index === props.activeIndex && props.index != null)
      cardRef.current?.focus();
  }, [props.activeIndex, props.index]);

  return (
    <StyledHoverCard
      role="button"
      ref={cardRef}
      tabIndex={0}
      {...props}
      onMouseDown={(e: any) => props.handleClick && props.handleClick(e)}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") props.handleClick && props.handleClick(e);
      }}
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
  border-radius: ${({ borderRadius }) => borderRadius};
  cursor: pointer;
  user-select: none;
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:focus {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default HoverCard;
