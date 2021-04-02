import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Button, HFlex } from "..";
import { ALIGNMENT, BUTTON_THEME } from "../../../shared";
import Spacer from "../Spacer/Spacer";

interface FooterProps {
  handleCancel?: () => void;
  handleMainButton?: () => void;
  mainButtonStyle?: BUTTON_THEME;
  isDisabled?: boolean;
  alignment?: ALIGNMENT;
  mainButtonText?: string;
}

const Footer: React.FC<FooterProps> = ({
  handleCancel,
  handleMainButton,
  isDisabled,
  mainButtonStyle = BUTTON_THEME.PRIMARY,
  alignment = ALIGNMENT.CENTER,
  mainButtonText,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <HFlex justifyContent={alignment}>
      <Button handleClick={handleCancel} buttonStyle={BUTTON_THEME.SECONDARY}>
        Cancel
      </Button>
      <Spacer width={theme.spacers.size64} />
      <Button
        handleClick={handleMainButton}
        buttonStyle={mainButtonStyle}
        disabled={isDisabled}
      >
        {mainButtonText}
      </Button>
    </HFlex>
  );
};

export default Footer;
