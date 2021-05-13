// Wrapper component for making an icon into a button with a hover and active state
import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components/macro";
import { formatMessage } from "../../../intl";

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
  iconActiveRef?: React.RefObject<HTMLButtonElement>;
  cursor?: string;
  ariaLabel?: string;
}

const IconActive: React.FC<IconActiveProps> = ({
  children,
  handleClick,
  fillType = FILL_TYPE.FILL,
  className,
  handleMouseDown,
  iconActiveRef,
  cursor,
  ariaLabel,
}) => {
  const intl = useIntl();
  return (
    <>
      <StyledIconActive
        ref={iconActiveRef}
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
        cursor={cursor}
        aria-label={ariaLabel && formatMessage(ariaLabel, intl)}
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
  cursor: ${({ cursor }) => cursor || "pointer"};
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
