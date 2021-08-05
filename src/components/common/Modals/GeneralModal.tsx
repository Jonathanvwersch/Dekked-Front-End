// Modal used whenever you are centering information on the screen
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Flex, Overlay, ShadowCard } from "..";
import { MODAL_TYPE, SIZES } from "../../../shared";
import Spacer from "../Spacer/Spacer";
import FocusLock, { AutoFocusInside } from "react-focus-lock";

interface GeneralModalProps {
  isOpen: boolean;
  handleClose: (args?: any) => void;
  children: React.ReactNode;
  header?: JSX.Element;
  size?: SIZES;
  type?: MODAL_TYPE;
  footer?: JSX.Element | string;
  id?: string;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  isOpen,
  handleClose,
  type = MODAL_TYPE.MODAL_LIGHTBOX,
  children,
  size = SIZES.LARGE,
  header,
  footer,
  id,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Overlay
      isOpen={isOpen}
      handleClose={handleClose}
      type={type}
      center={true}
      close={true}
      id={id}
    >
      <ShadowCard
        width={theme.sizes.modal[size]}
        padding={theme.spacers.size16}
      >
        <FocusLock>
          <AutoFocusInside>
            <Flex flexDirection="column">
              {header ? header : null}
              <Spacer height={theme.spacers.size20} />
              {children}
              <Spacer height={theme.spacers.size20} />
              {footer ? footer : null}
            </Flex>
          </AutoFocusInside>
        </FocusLock>
      </ShadowCard>
    </Overlay>
  );
};

export default React.memo(GeneralModal);
