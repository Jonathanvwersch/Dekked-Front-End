import React from "react";
import { createUseStyles } from "react-jss";
import { ThemeType } from "../../../theme";

interface ModalProps {
  borderRadius?: string;
  height?: string;
  width?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  const { modal } = useStyles({ ...props });
  return <div className={`${modal} ${props.className}`}>{children}</div>;
};

const useStyles = createUseStyles((theme: ThemeType) => ({
  modal: (props) => ({
    boxShadow: `${theme.boxShadow}`,
    borderRadius: props.borderRadius
      ? props.borderRadius
      : `${theme.display.borderRadiusTwo}`,
    height: props.height,
    width: props.width,
  }),
}));

export default Modal;
