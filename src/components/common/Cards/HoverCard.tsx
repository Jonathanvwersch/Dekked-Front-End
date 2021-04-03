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
  handleMouseDown?: (args: any) => any;
  padding?: string;
  activeIndex?: number;
  index?: number;
}

const HoverCard: React.FC<HoverCardProps> = ({ children, ...props }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Used to allow up and down movement using your arrows keys on hover cards, such as those found in a modal
  // To use, two variables are needed. Firstly, the index of the hover card (obtained from the array map prototype).
  // And secondly the active index of the arrow keys. See ScrollerModal to see implementation.
  useEffect(() => {
    if (cardRef && props.index === props.activeIndex && props.index != null) {
      cardRef.current?.focus();
    }
  }, [props.activeIndex, props.index]);

  return (
    <StyledHoverCard
      role="button"
      className={props.className}
      ref={cardRef}
      tabIndex={0}
      {...props}
      onClick={props.handleClick && props.handleClick}
      onMouseDown={props.handleMouseDown && props.handleMouseDown}
      onKeyDown={(e: any) => {
        if (e.key === "Enter")
          (props.handleClick && props.handleClick(e)) ||
            (props.handleMouseDown && props.handleMouseDown(e));
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

  &.active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }

  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:focus,
  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }
`;

export default HoverCard;
