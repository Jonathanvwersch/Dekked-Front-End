/* Overlay container used to render all popovers and modals */
import React, { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { createUseStyles } from "react-jss";
import { CloseIcon } from "../../../assets";
import { ThemeType } from "../../../theme";
import IconActive from "../IconActive/IconActive";

interface OverlayProps {
  children: JSX.Element;
  state: boolean;
  handleState: () => void;
  lightbox?: boolean;
  center?: boolean;
  close?: boolean | null;
  coords?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

const Overlay: React.FC<OverlayProps> = ({ children, ...props }) => {
  const classes = useStyles({ ...props });

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
      <div className={props.center ? classes.centeredOverlay : classes.overlay}>
        <div
          className={`${classes.modalContainer} ${
            props.lightbox && classes.lightbox
          }`}
          onClick={props.handleState}
        ></div>
        <div className={props.close ? classes.closeModal : classes.modal}>
          {children}
          {props.close ? (
            <IconActive
              className={classes.closeIcon}
              handleClick={props.handleState}
            >
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
  modal: (props) => ({
    ...props.coords,
    position: "fixed",
  }),
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

export default Overlay;
