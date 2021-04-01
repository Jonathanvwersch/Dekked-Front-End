// Modal used whenever you have a scrolling set of hover cards as is the case in the sidebar
import React, { Fragment, useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  Divider,
  HFlex,
  HoverCard,
  IconWrapper,
  Overlay,
  ShadowCard,
  Spacer,
  Text,
} from "..";
import { CoordsProps } from "../../../helpers/positionModals";
import { MODAL_TYPE } from "../Overlay/Overlay";

interface ScrollerModalProps {
  open: boolean;
  handleClose: () => void;
  clickFunctions: any;
  data: {
    label: string;
    icon: React.ReactNode;
    divider?: boolean;
    style?: string;
  }[];
  coords?: CoordsProps;
  cardRef?: React.RefObject<HTMLDivElement>;
  type?: MODAL_TYPE;
}

const ScrollerModal: React.FC<ScrollerModalProps> = ({
  open,
  handleClose,
  cardRef,
  clickFunctions,
  data,
  coords,
  type,
}) => {
  const theme = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);

  const eventHandler = (event: KeyboardEvent) => {
    if (open) {
      if (event.key === "ArrowUp") {
        setActiveIndex((activeIndex - 1 + data.length) % data.length);
      } else if (event.key === "ArrowDown") {
        setActiveIndex((activeIndex + 1) % data.length);
      }
    }
  };

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [open, activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Overlay state={open} handleState={handleClose} coords={coords} type={type}>
      <ShadowCard cardRef={cardRef} width={theme.sizes.modal.small}>
        {data.map((item, index) => {
          return (
            <Fragment key={`ScrollerModal ${index}`}>
              <HoverCard
                index={index}
                activeIndex={activeIndex}
                backgroundColor={theme.colors.backgrounds.modalBackground}
                handleMouseDown={(e: MouseEvent) => {
                  clickFunctions(item?.style ? item.style : item.label, e);
                }}
                padding={`${theme.spacers.size8} ${theme.spacers.size16}`}
              >
                <HFlex>
                  <IconWrapper>{item.icon}</IconWrapper>
                  <Spacer width={theme.spacers.size8} />
                  <Text>{item.label}</Text>
                </HFlex>
              </HoverCard>
              {item?.divider ? <Divider /> : null}
            </Fragment>
          );
        })}
      </ShadowCard>
    </Overlay>
  );
};

export default ScrollerModal;
