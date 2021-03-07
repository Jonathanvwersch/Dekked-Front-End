import React from "react";
import styled from "styled-components";

interface ShadowCardProps {
  borderRadius?: string;
  height?: string;
  width?: string;
  border?: string;
  backgroundColor?: string;
}

const ShadowCard: React.FC<ShadowCardProps> = ({ children, ...props }) => {
  return <StyledShadowCard {...props}>{children}</StyledShadowCard>;
};

const StyledShadowCard = styled.div<ShadowCardProps>`
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.display.borderRadiusTwo};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ border }) => border};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : theme.colors.backgrounds.pageBackground};
`;

export default ShadowCard;
