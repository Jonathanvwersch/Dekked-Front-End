import React, { useCallback, useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import ReactTooltip, { Effect, Offset, Place, Type } from "react-tooltip";
import styled, { ThemeContext } from "styled-components";
import { Overlay } from "..";
import { MODAL_TYPE } from "../../../shared";

interface TooltipProps {
  text?: string;
  id?: string;
  place?: Place;
  effect?: Effect;
  offset?: Offset;
  textColor?: string;
  backgroundColor?: string;
  type?: Type;
  children: React.ReactNode;
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
}) => {
  const theme = useContext(ThemeContext);
  const [tooltip, setTooltip] = useState<boolean>(false);

  // close tooltip when you click
  const handleClickOutside = useCallback(() => {
    setTooltip && setTooltip(false);
  }, [setTooltip]);

  useEffect(() => {
    if (tooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltip, handleClickOutside]);

  return (
    <>
      <Overlay isOpen={tooltip} type={MODAL_TYPE.TOOL_TIP}>
        <ReactTooltip
          multiline
          type={type}
          id={id}
          place={place}
          effect={effect}
          offset={offset}
          textColor={textColor}
          backgroundColor={
            backgroundColor ? backgroundColor : theme.colors.primary
          }
        >
          <FormattedMessage id={text} />
        </ReactTooltip>
      </Overlay>
      <TooltipChildren
        data-tip
        data-for={id}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
      >
        {children}
      </TooltipChildren>
    </>
  );
};

const TooltipChildren = styled.div`
  display: flex;
`;

export default React.memo(Tooltip);
