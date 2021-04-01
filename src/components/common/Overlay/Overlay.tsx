/* Overlay container used to render all popovers and modals */
import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CloseIcon } from "../../../assets";
import { CoordsProps } from "../../../helpers/positionModals";
import { SIZES } from "../../../shared";
import IconActive from "../IconActive/IconActive";

export enum MODAL_TYPE {
  // see https://www.nngroup.com/articles/popups/ for further reference on modal types
  MODAL_LIGHTBOX = "modal-lightbox", // includes modal and you can't interact with the background
  MODAL_NON_LIGHTBOX = "modal-non-lightbox", // no lightbox and you can't interact with the background
  NON_MODAL_NON_LIGHTBOX = "non-modal-non-lightbox", // no lightbox and can interact with the background
}

interface OverlayProps {
  children: JSX.Element;
  state: boolean;
  handleState: () => void;
  type?: MODAL_TYPE;
  center?: boolean; // set to true if you want to center the div on the screen
  close?: boolean; // set to true if you want to add an close (X) icon in the top right of your modal
  coords?: CoordsProps; // pass down top, left, bottom, right coordinates to position div relative to viewport
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  state,
  handleState,
  type = MODAL_TYPE.MODAL_NON_LIGHTBOX,
  center,
  close,
  coords,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on press of escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleState();
    },
    [handleState]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  // Close modal on press outside of modal
  const handleClickOutside = useCallback(
    (e: any) => {
      if (
        modalRef.current &&
        type === MODAL_TYPE.NON_MODAL_NON_LIGHTBOX &&
        !modalRef?.current.contains(e.target)
      ) {
        handleState();
      }
    },
    [handleState, type]
  );

  useEffect(() => {
    if (modalRef) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, handleClickOutside]);

  return createPortal(
    state ? (
      <OuterContainer>
        <CenteredOverlay className={center ? "centered" : undefined}>
          {type !== MODAL_TYPE.NON_MODAL_NON_LIGHTBOX ? (
            <ModalType
              className={type}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.preventDefault();
                handleState();
              }}
            />
          ) : null}
          <Modal
            coords={coords}
            className={close ? "close" : undefined}
            ref={modalRef}
          >
            {children}
            {close ? (
              <CloseIconContainer>
                <IconActive handleClick={handleState}>
                  <CloseIcon size={SIZES.LARGE} />
                </IconActive>
              </CloseIconContainer>
            ) : null}
          </Modal>
        </CenteredOverlay>
      </OuterContainer>
    ) : null,
    document.getElementById("modal-overlay")!
  );
};

const OuterContainer = styled.div`
  pointer-events: auto;
  position: relative;
  z-index: 0;
`;

const Modal = styled.div<{
  coords?: CoordsProps;
}>`
  top: ${({ coords }) => (coords?.top ? `${coords?.top + 15}px` : "auto")};
  bottom: ${({ coords }) =>
    coords?.bottom ? `${coords?.bottom + 5}px` : "auto"};
  left: ${({ coords }) => (coords?.left ? `${coords?.left}px` : "auto")};
  right: ${({ coords }) => (coords?.right ? `${coords?.right}px` : "auto")};
  position: fixed;

  &.close {
    position: relative;
  }
`;

const CenteredOverlay = styled.div`
  &.centered {
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const ModalType = styled.div`
  &.modal-lightbox {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background: ${({ theme }) => theme.colors.backgrounds.lightbox};
  }

  &.modal-non-lightbox {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px 16px 0px 0px;
`;

export default Overlay;
