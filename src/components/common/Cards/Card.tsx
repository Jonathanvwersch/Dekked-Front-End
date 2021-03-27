import React from "react";
import styled from "styled-components";
import { SIZES } from "../../../shared";

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
  padding: ${({ padding, theme }) =>
    padding ? padding : theme.spacers.size16};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ border }) => border};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.sizes.borderRadius[SIZES.SMALL]};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.secondary};
`;

export default Card;
