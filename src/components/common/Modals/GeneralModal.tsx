// Modal used whenever you are centering information on the screen
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { VFlex, Overlay, ShadowCard, Button } from "..";
import { SIZES } from "../../../shared";
import { BUTTON_THEME } from "../Button/Button";
import HFlex from "../HFlex/HFlex";
import { MODAL_TYPE } from "../Overlay/Overlay";
import Spacer from "../Spacer/Spacer";

export enum MODAL_FOOTER_TYPE {
  PRIMARY = "primary",
  DELETE = "delete",
}

interface GeneralModalProps {
  isOpen: boolean;
  handleClose: () => void;
  header: JSX.Element;
  footer?: JSX.Element;
  size?: SIZES;
  type?: MODAL_TYPE;
  handleMainButtonClick?: () => void;
  footerType?: string;
  isDisabledFooter?: boolean;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  handleClose,
  type = MODAL_TYPE.MODAL_LIGHTBOX,
  children,
  size = SIZES.LARGE,
  header,
  footer,
  handleMainButtonClick,
  footerType,
  isDisabledFooter,
}) => {
  const theme = useContext(ThemeContext);

  const selectFooter = () => {
    if (footerType) {
      return (
        <HFlex justifyContent="center">
          <Button
            handleClick={handleClose}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            Cancel
          </Button>
          <Spacer width={theme.spacers.size64} />
          <Button
            handleClick={handleMainButtonClick}
            buttonStyle={
              footerType === MODAL_FOOTER_TYPE.PRIMARY
                ? BUTTON_THEME.PRIMARY
                : BUTTON_THEME.DANGER
            }
            disabled={isDisabledFooter}
          >
            Study
          </Button>
        </HFlex>
      );
    } else if (footer) {
      return footer;
    } else return null;
  };

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
          {header}
          <Spacer height={theme.spacers.size24} />
          {children}
          <Spacer height={theme.spacers.size24} />
          {selectFooter()}
        </VFlex>
      </ShadowCard>
    </Overlay>
  );
};

export default GeneralModal;
