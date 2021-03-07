import React from "react";
import styled from "styled-components";

interface VFlexProps {
  padding?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
}

const VFlex: React.FC<VFlexProps> = ({ children, ...props }) => {
  return <StyledVFlex {...props}>{children}</StyledVFlex>;
};

const StyledVFlex = styled.div<VFlexProps>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => (padding ? padding : "16px")};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
`;

export default VFlex;
