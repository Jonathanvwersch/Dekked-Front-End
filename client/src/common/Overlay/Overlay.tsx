/* Overlay container used to render all popovers and modals */
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CloseIcon } from "../../assets";
import { CoordsProps } from "../../helpers/positionModals";
import IconActive from "../IconActive/IconActive";

interface OverlayProps {
  children: JSX.Element;
  state: boolean;
  handleState: () => void;
  lightbox?: boolean;
  center?: boolean;
  close?: boolean | null;
  coords?: CoordsProps;
}

const Overlay: React.FC<OverlayProps> = ({ children, ...props }) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") props.handleState();
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  return createPortal(
    props.state ? (
      <StyledOverlay className={props.center ? "centered" : undefined}>
        <Lightbox
          className={props.lightbox ? "lightbox-on" : undefined}
          onClick={(e) => {
            e.preventDefault();
            props.handleState();
          }}
        ></Lightbox>
        <CloseModalContainer
          {...props}
          className={props.close ? "close" : undefined}
        >
          {children}
          {props.close ? (
            <CloseIconContainer>
              <IconActive handleClick={props.handleState}>
                <CloseIcon />
              </IconActive>
            </CloseIconContainer>
          ) : null}
        </CloseModalContainer>
      </StyledOverlay>
    ) : null,
    document.getElementById("modal-overlay")!
  );
};

const CloseModalContainer = styled.div<{
  coords?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}>`
  top: ${({ coords }) => coords?.top && coords?.top + 15}px;
  bottom: ${({ coords }) => coords?.bottom}px;
  left: ${({ coords }) => coords?.left}px;
  right: ${({ coords }) => coords?.right}px;
  position: fixed;

  &.close {
    position: relative;
  }
`;

const StyledOverlay = styled.div`
  pointer-events: auto;
  position: relative;
  width: 100%;
  height: 100%;

  &.centered {
    display: flex;
    alignitems: center;
    justify-content: center;
  }
`;

const Lightbox = styled.div`
  position: fixed;
  inset: 0px;
  width: 100vw;
  height: 100vh;

  &.lightbox-on {
    background: ${({ theme }) => theme.colors.backgrounds.lightbox};
  }
`;

const CloseIconContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  margin: 8px 16px 0px 0px;
`;

export default Overlay;
