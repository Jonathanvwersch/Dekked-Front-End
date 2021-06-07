import React, { ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import ReactTooltip, { Effect, Offset, Place, Type } from "react-tooltip";
import styled from "styled-components";
import { ConditionalWrapper, Overlay } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import { MODAL_TYPE, SIZES } from "../../../shared";

interface TooltipProps {
  text: string;
  id: string;
  place?: Place;
  effect?: Effect;
  offset?: Offset;
  textColor?: string;
  backgroundColor?: string;
  type?: Type;
  children?: React.ReactNode;
  isActive?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  id,
  place = "bottom",
  effect = "solid",
  offset,
  textColor,
  backgroundColor,
  type,
  text,
  children,
  isActive = true,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  return (
    <>
      <Overlay isOpen type={MODAL_TYPE.TOOL_TIP}>
        <StyledTooltip
          multiline
          type={type}
          id={id}
          place={place}
          effect={effect}
          offset={offset}
          role={formatMessage(text)}
          textColor={textColor || theme.colors.oppositeFontColor}
          delayShow={500}
          backgroundColor={
            backgroundColor ? backgroundColor : theme.colors.iconColor
          }
        >
          <FormattedMessage id={text} />
        </StyledTooltip>
      </Overlay>

      <ConditionalWrapper
        condition={isActive}
        wrapper={(children: ReactElement) => (
          <TooltipChildren data-tip data-for={id}>
            {children}
          </TooltipChildren>
        )}
      >
        {children}
      </ConditionalWrapper>
    </>
  );
};

const StyledTooltip = styled(ReactTooltip).attrs({
  className: "dekkedTooltip",
})`
  &.dekkedTooltip {
    padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size8}`};
    font-size: ${({ theme }) => theme.typography.fontSizes.size12};
    border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
  }
`;

const TooltipChildren = styled.div`
  display: flex;
`;

export default React.memo(Tooltip);
