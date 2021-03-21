import React from "react";
import styled from "styled-components";

interface CardProps {
  padding?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
}

const Card: React.FC<CardProps> = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

const StyledCard = styled.div<CardProps>`
  padding: ${({ padding }) => (padding ? padding : "16px")};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ border }) => border};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.display.borderRadiusTwo};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.secondary};
`;

export default Card;
