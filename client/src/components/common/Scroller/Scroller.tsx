import React from "react";
import styled from "styled-components";

const Scroller: React.FC = ({ children, ...props }) => {
  return <StyledScroller {...props}>{children}</StyledScroller>;
};

const StyledScroller = styled.div`
  overflow: hidden auto;
`;

export default Scroller;
