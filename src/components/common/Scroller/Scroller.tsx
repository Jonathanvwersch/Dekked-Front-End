// Wrapper component that supplies a scroll bar on hover
import React from "react";
import styled from "styled-components";

interface ScrollerProps {
  width?: string;
  height?: string;
  scrollerRef?: any;
}

const Scroller: React.FC<ScrollerProps> = ({ children, ...props }) => {
  return (
    <StyledScroller ref={props.scrollerRef} {...props}>
      {children}
    </StyledScroller>
  );
};

const StyledScroller = styled.div<ScrollerProps>`
  overflow: hidden;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  &:hover {
    overflow: auto;
  }
`;

export default Scroller;
