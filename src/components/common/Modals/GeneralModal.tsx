// Modal used whenever you are centering information on the screen
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { VFlex, Overlay, ShadowCard } from "..";
import { MODAL_TYPE, SIZES } from "../../../shared";
import Spacer from "../Spacer/Spacer";

interface GeneralModalProps {
  isOpen: boolean;
  handleClose: () => void;
  header?: JSX.Element;
  size?: SIZES;
  type?: MODAL_TYPE;
  footer?: JSX.Element;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  handleClose,
  type = MODAL_TYPE.MODAL_LIGHTBOX,
  children,
  size = SIZES.LARGE,
  header,
  footer,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Overlay
      state={isOpen}
      handleState={handleClose}
      type={type}
      center={true}
      close={true}
    >
      <ShadowCard
        width={theme.sizes.modal[size]}
        padding={theme.spacers.size16}
      >
        <VFlex>
          {header ? header : null}
          <Spacer height={theme.spacers.size24} />
          {children}
          <Spacer height={theme.spacers.size24} />
          {footer ? footer : null}
        </VFlex>
      </ShadowCard>
    </Overlay>
  );
};

export default GeneralModal;
