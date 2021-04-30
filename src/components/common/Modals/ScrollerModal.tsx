// Modal used whenever you have a scrolling set of hover cards as is the case in the sidebar
import React, { Fragment, useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { Block, Divider, Overlay, ShadowCard, ConditionalWrapper } from "..";
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
  withOverlay?: boolean;
}

const ScrollerModal: React.FC<ScrollerModalProps> = ({
  open,
  handleClose,
  cardRef,
  clickFunctions,
  data,
  coords,
  type = MODAL_TYPE.MODAL_NON_LIGHTBOX,
  withOverlay = true,
}) => {
  const theme = useContext(ThemeContext);
  const { activeIndex } = useKeyDownAndUpListener(open, data.length);

  return (
    <ConditionalWrapper
      condition={withOverlay}
      wrapper={(children: any) => (
        <Overlay
          isOpen={open}
          handleClose={handleClose}
          coords={coords}
          type={type}
        >
          {children}
        </Overlay>
      )}
    >
      <StyledScrollerModal
        withOverlay={withOverlay}
        coords={coords}
        width={theme.sizes.modal.small}
        cardRef={cardRef}
      >
        {data.map((item, index) => {
          return (
            <Fragment key={`ScrollerModal ${index}`}>
              <Block
                index={index}
                activeIndex={activeIndex}
                icon={item?.icon}
                label={item?.label}
                className="focus"
                hoverCard={item?.hoverCard}
                handleClick={(e: MouseEvent) =>
                  clickFunctions(item?.style ? item.style : item.label, e)
                }
              />
              {item?.divider ? <Divider /> : null}
            </Fragment>
          );
        })}
      </StyledScrollerModal>
    </ConditionalWrapper>
  );
};

const StyledScrollerModal = styled(ShadowCard)<{
  withOverlay: boolean;
  coords: CoordsType | undefined;
}>`
  position: ${({ withOverlay }) => (!withOverlay ? "absolute" : undefined)};
  left: ${({ withOverlay, coords }) =>
    !withOverlay && coords?.left ? `${coords?.left}px` : undefined};
  top: ${({ withOverlay, coords }) =>
    !withOverlay && coords?.top ? `${coords?.top}px` : undefined};
  bottom: ${({ coords, withOverlay }) =>
    !withOverlay && coords?.bottom ? `${coords?.bottom}px` : undefined};
  right: ${({ coords, withOverlay }) =>
    !withOverlay && coords?.right ? `${coords?.right}px` : undefined};
  max-height: 250px;
  overflow: hidden;
  z-index: 100;
  &:hover {
    overflow: auto;
  }
`;

export default React.memo(ScrollerModal);
