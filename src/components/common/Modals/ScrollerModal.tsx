// Modal used whenever you have a scrolling set of hover cards as is the case in the sidebar
import React, { Fragment, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Divider, Overlay, ShadowCard } from "dekked-design-system";
import { useKeyDownAndUpListener, useLayeredModal } from "../../../hooks";
import { CoordsType, MODAL_TYPE, ScrollerModalData } from "../../../shared";
import { Block } from "..";

interface ScrollerModalProps {
  open: boolean;
  handleClose: () => void;
  clickFunctions: (args?: any) => void;
  data: ScrollerModalData;
  coords?: CoordsType;
  cardRef?: React.RefObject<HTMLDivElement>;
  type?: MODAL_TYPE;
  fullHeight?: boolean;
  fakeFocus?: boolean;
  preventDefault?: boolean;
  id?: string;
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
  fakeFocus,
  preventDefault,
  id,
}) => {
  const theme = useContext(ThemeContext);

  const { activeIndex } = useKeyDownAndUpListener(
    open,
    data.length,
    preventDefault
  );

  useLayeredModal(open);

  return (
    <Overlay
      isOpen={open}
      handleClose={handleClose}
      coords={coords}
      type={type}
      withOutsideClick
      id={id}
    >
      <StyledScrollerModal
        fullHeight={fullHeight}
        coords={coords}
        width={theme.sizes.modal.small}
        cardRef={cardRef}
      >
        {data.map((item, index) => (
          <Fragment key={item.label}>
            <Block
              index={index}
              activeIndex={activeIndex}
              icon={item?.icon}
              fakeFocus={fakeFocus}
              label={item?.label}
              turnOffHover={item?.turnOffHover}
              handleClick={() => {
                handleClose();
                clickFunctions(item?.value);
              }}
            />
            {item?.divider ? <Divider /> : null}
          </Fragment>
        ))}
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
