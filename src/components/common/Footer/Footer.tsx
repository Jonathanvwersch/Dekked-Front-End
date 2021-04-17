import React from "react";
import { ThemeContext } from "styled-components/macro";
import { Box, Button, Divider, HFlex, Spacer } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import { BUTTON_THEME } from "../../../shared";

interface FooterProps {
  handleCancel: () => void;
  handleMainButton?: () => void;
  mainButtonStyle?: BUTTON_THEME;
  isDisabled?: boolean;
  alignment?: "flex-start" | "center";
  mainButtonText: string;
  padding?: string;
  divider?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  handleCancel,
  handleMainButton,
  isDisabled,
  mainButtonStyle = BUTTON_THEME.PRIMARY,
  alignment = "center",
  mainButtonText,
  padding,
  divider,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext);

  return (
    <>
      {divider ? <Divider /> : null}
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
