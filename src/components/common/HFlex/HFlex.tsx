import React from "react";
import styled from "styled-components/macro";

interface HFlexProps {
  backgroundcolor?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  minHeight?: string;
}

const HFlex: React.FC<HFlexProps> = ({ children, ...props }) => {
  return <StyledHFlex {...props}>{children}</StyledHFlex>;
};

const StyledHFlex = styled.div<HFlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }) => justifyContent};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  min-height: ${({ minHeight }) => minHeight};
`;

export default HFlex;
