import React from "react";
import styled from "styled-components";

interface HFlexProps {
  padding?: string;
  backgroundcolor?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  cursor?: string;
  position?: string;
  className?: string;
}

const HFlex: React.FC<HFlexProps> = ({ children, ...props }) => {
  return <StyledHFlex {...props}>{children}</StyledHFlex>;
};

const StyledHFlex = styled.div<HFlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }) => justifyContent};
  padding: ${({ padding }) => (padding ? padding : "16px")};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
`;

export default HFlex;
