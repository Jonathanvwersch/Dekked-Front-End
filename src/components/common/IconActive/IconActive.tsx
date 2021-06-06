// Wrapper component for making an icon into a button with a hover and active state
import { isEqual } from "lodash";
import React, { memo, ReactNode } from "react";
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
  handleClick?: (args: any) => void;
  fillType?: string;
  handleMouseDown?: (args: any) => void;
  iconActiveRef?: React.RefObject<HTMLButtonElement>;
  cursor?: string;
  ariaLabel?: string;
  isDisabled?: boolean;
  tabIndex?: number;
  dangerHover?: boolean;
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
}) => {
  const intl = useIntl();

  return (
    <StyledIconActive
      ref={iconActiveRef}
      backgroundColor={backgroundColor}
      onMouseDown={handleMouseDown && handleMouseDown}
      onClick={handleClick && handleClick}
      onKeyDown={(e: any) => {
        if (e.key === "Enter") {
          (handleClick && handleClick(e)) ||
            (handleMouseDown && handleMouseDown(e));
        }
      }}
      className={className}
      fillType={fillType}
      tabIndex={tabIndex}
      cursor={cursor}
      aria-label={ariaLabel && formatMessage(ariaLabel, intl)}
      disabled={isDisabled}
      dangerHover={dangerHover}
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
  position: relative;
  cursor: ${({ cursor }) => cursor || "pointer"};
  outline: none;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.backgrounds.pageBackground};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.SMALL]};

  &.active {
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
  &:hover {
    filter: ${({ theme }) => theme.colors.hover.filter};
  }

  &:active {
    filter: ${({ theme }) => theme.colors.active.filter};
  }

  &:disabled {
    & svg {
      & path {
        fill: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.FILL || fillType === FILL_TYPE.BOTH
            ? theme.colors.grey1
            : "auto"};
        stroke: ${({ theme, fillType }) =>
          fillType === FILL_TYPE.STROKE || fillType === FILL_TYPE.BOTH
            ? theme.colors.grey1
            : "auto"};
      }
    }
  }
`;

export default memo(IconActive, (oldProps, newProps) => {
  return isEqual(oldProps, newProps);
});
