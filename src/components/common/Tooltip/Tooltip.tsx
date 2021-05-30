import React, { ReactElement, useState } from "react";
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
  className?: string;
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
  className,
  isActive = true,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [tooltip, setTooltip] = useState<boolean>(false);

  return (
    <>
      {tooltip && (
        <Overlay
          handleClose={() => setTooltip(false)}
          isOpen={tooltip}
          type={MODAL_TYPE.TOOL_TIP}
        >
          <StyledTooltip
            multiline
            type={type}
            id={id}
            place={place}
            effect={effect}
            offset={offset}
            className={className}
            role={formatMessage(text)}
            textColor={textColor}
            delayShow={500}
            backgroundColor={
              backgroundColor ? backgroundColor : theme.colors.fontColor
            }
          >
            <FormattedMessage id={text} />
          </StyledTooltip>
        </Overlay>
      )}
      <ConditionalWrapper
        condition={isActive}
        wrapper={(children: ReactElement) => (
          <TooltipChildren
            data-tip
            data-for={id}
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            onClick={() => setTooltip(false)}
          >
            {children}
          </TooltipChildren>
        )}
      >
        {children}
      </ConditionalWrapper>
    </>
  );
};

const StyledTooltip = styled(ReactTooltip)`
  border-radius: ${({ theme }) =>
    theme.sizes.borderRadius[SIZES.MEDIUM]}!important;
`;

const TooltipChildren = styled.div`
  display: flex;
`;

export default React.memo(Tooltip);
