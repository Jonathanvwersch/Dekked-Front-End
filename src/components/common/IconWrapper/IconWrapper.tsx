import React from "react";
import styled from "styled-components";

const IconWrapper: React.FC = ({ children }) => {
  return <StyledIconWrapper>{children}</StyledIconWrapper>;
};

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default IconWrapper;
