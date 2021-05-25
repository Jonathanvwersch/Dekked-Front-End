// Wrapper component for making an icon into a button with a hover and active state
import { isEqual } from "lodash";
import React, { memo, ReactNode } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { formatMessage } from "../../../intl";

export enum FILL_TYPE {
  FILL = "fill",
  STROKE = "stroke",
  BOTH = "both",
}

interface IconActiveProps {
  children: ReactNode;
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
  fillType = FILL_TYPE.FILL,
  className,
  handleMouseDown,
  iconActiveRef,
  cursor,
  ariaLabel,
  isDisabled = false,
  tabIndex = 0,
  dangerHover,
}) => {
  const intl = useIntl();

  return (
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
  background: none;
  cursor: ${({ cursor }) => cursor || "pointer"};
  outline: none;

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

  &:hover {
    & svg {
      & path {
        fill: ${({ theme, fillType, dangerHover }) =>
          fillType === FILL_TYPE.FILL || fillType === FILL_TYPE.BOTH
            ? (dangerHover && theme.colors.danger) || theme.colors.primary
            : "auto"};
        stroke: ${({ theme, fillType, dangerHover }) =>
          fillType === FILL_TYPE.STROKE || fillType === FILL_TYPE.BOTH
            ? (dangerHover && theme.colors.danger) || theme.colors.primary
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
