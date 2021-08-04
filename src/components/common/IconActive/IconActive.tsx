// Wrapper component for making an icon into a button with a hover and active state
import React, { ReactNode } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { formatMessage } from "../../../intl";
import { SIZES } from "../../../shared";

export enum FILL_TYPE {
  FILL = "fill",
  STROKE = "stroke",
  BOTH = "both",
}

interface IconActiveProps {
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  handleClick?: (args?: any) => void;
  fillType?: string;
  handleMouseDown?: (args?: any) => void;
  iconActiveRef?: React.RefObject<HTMLButtonElement>;
  cursor?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  tabIndex?: number;
  dangerHover?: boolean;
  id?: string;
}

const IconActive: React.FC<IconActiveProps> = ({
  children,
  handleClick,
  backgroundColor,
  fillType = FILL_TYPE.FILL,
  className,
  handleMouseDown,
  iconActiveRef,
  cursor,
  ariaLabel,
  isDisabled = false,
  tabIndex,
  dangerHover,
  id,
}) => {
  const intl = useIntl();

  return (
    <StyledIconActive
      ref={iconActiveRef}
      backgroundColor={backgroundColor}
      onMouseDown={handleMouseDown && handleMouseDown}
      onClick={handleClick && handleClick}
      className={className}
      fillType={fillType}
      tabIndex={tabIndex}
      cursor={cursor}
      aria-label={ariaLabel && formatMessage(ariaLabel, intl)}
      disabled={isDisabled}
      dangerHover={dangerHover}
      id={id}
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
  padding: 2px;
  border: none;
  position: relative;
  cursor: ${({ cursor }) => cursor || "pointer"};
  outline: none;
  background-color: ${({ backgroundColor }) => backgroundColor || "inherit"};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.SMALL]};

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.iconHover};
  }

  &:active {
    background-color: transparent;
  }

  &:disabled {
    cursor: not-allowed;
    & svg {
      & path {
        fill: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.FILL || fillType === FILL_TYPE.BOTH
            ? theme.colors.disabled
            : undefined};
        stroke: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.STROKE || fillType === FILL_TYPE.BOTH
            ? theme.colors.disabled
            : undefined};
      }
    }
    background-color: ${({ backgroundColor }) => backgroundColor || "inherit"};
  }

  &.active {
    & svg {
      & path {
        fill: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.FILL || fillType === FILL_TYPE.BOTH
            ? theme.colors.primary
            : undefined};
        stroke: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.STROKE || fillType === FILL_TYPE.BOTH
            ? theme.colors.primary
            : undefined};
      }
    }
  }
`;

export default IconActive;
