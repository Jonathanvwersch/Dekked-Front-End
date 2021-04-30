import React from "react";
import styled from "styled-components/macro";

const IconWrapper: React.FC = ({ children }) => {
  return <StyledIconWrapper>{children}</StyledIconWrapper>;
};

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default IconWrapper;
