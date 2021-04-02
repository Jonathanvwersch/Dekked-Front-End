// Modal used whenever you have a scrolling set of hover cards as is the case in the sidebar
import React, { Fragment, useContext, useEffect, useState } from "react";
import { ThemeContext } from "styled-components";
import { Block, Divider, Overlay, ShadowCard } from "..";
import { CoordsProps } from "../../../helpers/positionModals";
import { MODAL_TYPE, ScrollerModalData } from "../../../shared";

interface ScrollerModalProps {
  open: boolean;
  handleClose: () => void;
  clickFunctions: any;
  data: ScrollerModalData;
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
  type = MODAL_TYPE.MODAL_NON_LIGHTBOX,
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
              <Block
                index={index}
                activeIndex={activeIndex}
                icon={item.icon}
                label={item.label}
                handleClick={(e: MouseEvent) =>
                  clickFunctions(item?.style ? item.style : item.label, e)
                }
              />
              {item?.divider ? <Divider /> : null}
            </Fragment>
          );
        })}
      </ShadowCard>
    </Overlay>
  );
};

export default ScrollerModal;
