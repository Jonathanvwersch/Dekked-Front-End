import React, { ReactElement, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { FormattedMessage, useIntl } from "react-intl";
import ReactTooltip, { Effect, Offset, Place, Type } from "react-tooltip";
import styled, { ThemeContext } from "styled-components";
import { ConditionalWrapper, SIZES } from "dekked-design-system";
import { formatMessage } from "../../../intl";

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
  values?: {};
  tooltipChildrenStyle?: React.CSSProperties | undefined;
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
  values,
  tooltipChildrenStyle,
}) => {
  const theme = useContext(ThemeContext);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const intl = useIntl();

  return (
    <>
      {showTooltip &&
        createPortal(
          <StyledTooltip
            multiline
            type={type}
            id={id}
            place={place}
            effect={effect}
            offset={offset}
            role={formatMessage(text, intl)}
            textColor={textColor || theme.colors.oppositeFontColor}
            delayShow={500}
            backgroundColor={
              backgroundColor ? backgroundColor : theme.colors.iconColor
            }
          >
            <FormattedMessage id={text} values={values} />
          </StyledTooltip>,
          document.getElementById("modal-overlay")!
        )}

      <ConditionalWrapper
        condition={isActive}
        wrapper={(children: ReactElement) => (
          <TooltipChildren
            style={tooltipChildrenStyle}
            data-tip
            data-for={id}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
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
