import React from "react";
import styled from "styled-components";
import { SIZES } from "../../../shared";
import { BoxProps, marginAndPadding } from "../Box/Box";

interface CardProps {
  padding?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  ariaLabel?: string;
  tabIndex?: number;
  opacity?: string;
  className?: string;
  handleClick?: (args?: any) => void;
}

type CardPropsUnion = CardProps & BoxProps;

const Card: React.FC<CardPropsUnion> = ({ children, ...props }) => {
  return (
    <StyledCard
      className={props.className}
      aria-label={props.ariaLabel}
      tabIndex={props.tabIndex}
      onClick={props.handleClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

const StyledCard = styled.div<CardPropsUnion>`
  opacity: ${({ opacity }) => opacity};
  user-select: none;
  padding: ${({ padding, theme }) =>
    padding ? padding : theme.spacers.size16};
  height: ${({ height }) => height};
  width: ${({ width }) => (width ? width : "100%")};
  border: ${({ border }) => border};
  border-radius: ${({ theme, borderRadius }) =>
    borderRadius ? borderRadius : theme.sizes.borderRadius[SIZES.MEDIUM]};
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor ? backgroundColor : theme.colors.secondary};
  ${() => marginAndPadding}
`;

export default Card;
