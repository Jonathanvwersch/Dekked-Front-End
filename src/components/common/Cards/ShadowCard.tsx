// Wrapper component for whenever you want to add a box shadow to a component
import React from "react";
import styled from "styled-components/macro";
import { SIZES } from "../../../shared";

interface ShadowCardProps {
  borderRadius?: string;
  height?: string;
  width?: string;
  border?: string;
  backgroundColor?: string;
  position?: string;
  padding?: string;
  cardRef?: React.RefObject<HTMLDivElement>;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ children, ...props }) => {
  return (
    <StyledShadowCard ref={props.cardRef} {...props}>
      {children}
    </StyledShadowCard>
  );
};

const StyledShadowCard = styled.div<ShadowCardProps>`
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.sizes.borderRadius[SIZES.MEDIUM]};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ border }) => border};
  position: ${({ position }) => position};
  padding: ${({ padding }) => padding};
  overflow: hidden;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : theme.colors.backgrounds.pageBackground};
`;

export default ShadowCard;
