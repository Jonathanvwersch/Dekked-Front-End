import React from "react";
import styled from "styled-components";

interface IconWrapperProps {
  handleClick?: () => void;
}

const IconWrapper: React.FC<IconWrapperProps> = ({ children, handleClick }) => {
  return (
    <StyledIconWrapper onClick={handleClick}>{children}</StyledIconWrapper>
  );
};

const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export default IconWrapper;
