// Modal used whenever you have a scrolling set of hover cards as is the case in the sidebar
import React, { Fragment, useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { Block, Divider, Overlay, ShadowCard } from "..";
import { useKeyDownAndUpListener } from "../../../hooks";
import { CoordsType, MODAL_TYPE, ScrollerModalData } from "../../../shared";

interface ScrollerModalProps {
  open: boolean;
  handleClose: () => void;
  clickFunctions: any;
  data: ScrollerModalData;
  coords?: CoordsType;
  cardRef?: React.RefObject<HTMLDivElement>;
  type?: MODAL_TYPE;
  fullHeight?: boolean;
}

const ScrollerModal: React.FC<ScrollerModalProps> = ({
  open,
  handleClose,
  cardRef,
  clickFunctions,
  data,
  coords,
  type = MODAL_TYPE.MODAL_NON_LIGHTBOX,
  fullHeight,
}) => {
  const theme = useContext(ThemeContext);
  const { activeIndex } = useKeyDownAndUpListener(open, data.length);

  return (
    <Overlay
      isOpen={open}
      handleClose={handleClose}
      coords={coords}
      type={type}
    >
      <StyledScrollerModal
        fullHeight={fullHeight}
        coords={coords}
        width={theme.sizes.modal.small}
        cardRef={cardRef}
      >
        {data.map((item, index) => {
          return (
            <Fragment key={item.label}>
              <Block
                index={index}
                activeIndex={activeIndex}
                icon={item?.icon}
                label={item?.label}
                className="focus"
                hoverCard={item?.hoverCard}
                handleClick={(e: MouseEvent) => {
                  e.preventDefault();
                  clickFunctions(item?.style ? item.style : item.label, e);
                }}
              />
              {item?.divider ? <Divider /> : null}
            </Fragment>
          );
        })}
      </StyledScrollerModal>
    </Overlay>
  );
};

const StyledScrollerModal = styled(ShadowCard)<{
  coords: CoordsType | undefined;
  fullHeight?: boolean;
}>`
  max-height: ${({ fullHeight }) => (fullHeight ? "100%" : "250px")};
  overflow: hidden;
  z-index: 100;
  &:hover {
    overflow: auto;
  }
`;

export default React.memo(ScrollerModal);
