import React from "react";
import styled from "styled-components";
import { BoxProps, marginAndPadding } from "../Box/Box";

interface FlexProps {
  backgroundcolor?: string;
  alignItems?: string;
  justifyContent?: string;
  height?: string;
  width?: string;
  minHeight?: string;
  minWidth?: string;
  id?: string;
  flexDirection?: "row" | "column";
  className?: string;
  overflow?: string;
}

type FlexPropsUnion = FlexProps & BoxProps;

const Flex: React.FC<FlexPropsUnion> = ({ children, ...props }) => {
  return (
    <StyledFlex className={props.className} id={props.id} {...props}>
      {children}
    </StyledFlex>
  );
};

const StyledFlex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }) => justifyContent};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  min-height: ${({ minHeight }) => minHeight};
  min-width: ${({ minWidth }) => minWidth};
  overflow: ${({ overflow }) => overflow};
  ${() => marginAndPadding}
`;

export default Flex;
