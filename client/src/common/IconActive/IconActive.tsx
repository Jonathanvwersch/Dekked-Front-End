// Wrapper component for making an icon into a button with a hover and active state
import React from "react";
import styled from "styled-components";

export enum FILL_TYPE {
  FILL = "fill",
  STROKE = "stroke",
  BOTH = "both",
}

interface IconActiveProps {
  className?: string;
  handleClick?: Function;
  fillType?: string;
}

const IconActive: React.FC<IconActiveProps> = ({
  children,
  handleClick,
  fillType = FILL_TYPE.FILL,
  className,
}) => {
  return (
    <StyledIconActive
      aria-label="icon"
      onClick={(event: any) => {
        handleClick && handleClick(event);
      }}
      className={className}
      fillType={fillType}
    >
      {children}
    </StyledIconActive>
  );
};

const StyledIconActive = styled.button<IconActiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  &:hover {
    & svg {
      & path {
        fill: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.FILL || fillType === FILL_TYPE.BOTH
            ? theme.colors.primary
            : "auto"};
        stroke: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.STROKE || fillType === FILL_TYPE.BOTH
            ? theme.colors.primary
            : "auto"};
      }
    }
  }

  &:active {
    & svg {
      & path {
        filter: ${({ theme }) => theme.colors.hover.filter};
      }
    }
  }
`;

export default IconActive;
