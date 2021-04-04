import React from "react";
import { ThemeContext } from "styled-components";
import { Box, Button, Divider, HFlex, Spacer } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import { ALIGNMENT, BUTTON_THEME } from "../../../shared";
import { useIntl } from "react-intl";

interface FooterProps {
  handleCancel?: () => void;
  handleMainButton?: () => void;
  mainButtonStyle?: BUTTON_THEME;
  isDisabled?: boolean;
  alignment?: ALIGNMENT;
  mainButtonText: string;
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
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

  return (
    <>
      <Divider />
      <Box p={padding ? padding : theme.spacers.size16}>
        <HFlex justifyContent={alignment}>
          <Button
            handleClick={handleCancel}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            {formatMessage("generics.cancel")}
          </Button>
          <Spacer width={theme.spacers.size32} />
          <Button
            handleClick={handleMainButton}
            buttonStyle={mainButtonStyle}
            disabled={isDisabled}
          >
            {formatMessage(mainButtonText)}
          </Button>
        </HFlex>
      </Box>
    </>
  );
};

export default Footer;
