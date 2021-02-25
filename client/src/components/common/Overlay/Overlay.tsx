/* Overlay container used to render all popovers and modals */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { createUseStyles } from "react-jss";
import { CloseIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import IconActive from "../IconActive/IconActive";

interface Props {
  children: JSX.Element;
  state: boolean;
  handleState: () => void;
  lightbox?: boolean;
  center?: boolean;
  close?: boolean | null;
}

const Portal: React.FC<Props> = ({
  children,
  state,
  handleState,
  lightbox = false, // Set state of lightbox
  center = false, // Center child item on portal
  close = false, // Show close icon in top right of child item
}) => {
  const classes = useStyles();

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => handleState);
  }, [handleState]);

  return createPortal(
    state ? (
      <div className={center ? classes.centeredOverlay : classes.overlay}>
        <div
          className={`${classes.modalContainer} ${
            lightbox && classes.lightbox
          }`}
          onClick={handleState}
        ></div>
        <div className={close ? classes.closeModal : classes.modal}>
          {children}
          {close ? (
            <IconActive className={classes.closeIcon} handleClick={handleState}>
              <CloseIcon />
            </IconActive>
          ) : null}
        </div>
      </div>
    ) : null,
    document.getElementById("modal-overlay")!
  );
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  overlay: {
    pointerEvents: "auto",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  centeredOverlay: {
    pointerEvents: "auto",
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lightbox: {
    background: `${theme.colors.backgrounds.lightbox}`,
  },
  modalContainer: {
    position: "fixed",
    inset: "0px",
    width: "100vw",
    height: "100vh",
  },
  modal: {
    position: "fixed",
  },
  closeModal: {
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "8px 16px 0px 0px",
  },
}));

export default Portal;
