import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Box, Button, Divider, HFlex, Spacer } from "..";
import { ALIGNMENT, BUTTON_THEME } from "../../../shared";

interface FooterProps {
  handleCancel?: () => void;
  handleMainButton?: () => void;
  mainButtonStyle?: BUTTON_THEME;
  isDisabled?: boolean;
  alignment?: ALIGNMENT;
  mainButtonText?: string;
  padding?: string;
}

const Footer: React.FC<FooterProps> = ({
  handleCancel,
  handleMainButton,
  isDisabled,
  mainButtonStyle = BUTTON_THEME.PRIMARY,
  alignment = ALIGNMENT.CENTER,
  mainButtonText,
  padding,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Divider />
      <Box p={padding ? padding : theme.spacers.size16}>
        <HFlex justifyContent={alignment}>
          <Button
            handleClick={handleCancel}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            Cancel
          </Button>
          <Spacer width={theme.spacers.size32} />
          <Button
            handleClick={handleMainButton}
            buttonStyle={mainButtonStyle}
            disabled={isDisabled}
          >
            {mainButtonText}
          </Button>
        </HFlex>
      </Box>
    </>
  );
};

export default Footer;
