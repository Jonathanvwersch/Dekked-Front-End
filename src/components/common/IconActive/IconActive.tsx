// Wrapper component for making an icon into a button with a hover and active state
import React from "react";
import styled from "styled-components/macro";

export enum FILL_TYPE {
  FILL = "fill",
  STROKE = "stroke",
  BOTH = "both",
}

interface IconActiveProps {
  className?: string;
  handleClick?: (args: any) => void;
  fillType?: string;
  handleMouseDown?: (args: any) => void;
}

const IconActive: React.FC<IconActiveProps> = ({
  children,
  handleClick,
  fillType = FILL_TYPE.FILL,
  className,
  handleMouseDown,
}) => {
  return (
    <>
      <StyledIconActive
        onMouseDown={handleMouseDown && handleMouseDown}
        onClick={handleClick && handleClick}
        onKeyDown={(e: any) => {
          if (e.key === "Enter")
            (handleClick && handleClick(e)) ||
              (handleMouseDown && handleMouseDown(e));
        }}
        className={className}
        fillType={fillType}
        tabIndex={0}
      >
        {children}
      </StyledIconActive>
    </>
  );
};

const StyledIconActive = styled.button<IconActiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
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

  &:focus,
  &:active {
    & svg {
      & path {
        filter: ${({ theme }) => theme.colors.hover.filter};
      }
    }
  }
`;

export default IconActive;
