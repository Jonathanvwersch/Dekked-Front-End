import React from "react";
import { Box, Button, Divider, Flex, Spacer } from "..";
import { usePageSetupHelpers } from "../../../hooks";
import { BUTTON_THEME, SIZES } from "../../../shared";

interface FooterProps {
  handleCancel: () => void;
  handleMainButton?: (args: any) => void;
  mainButtonStyle?: BUTTON_THEME;
  isDisabled?: boolean;
  alignment?: "flex-start" | "center";
  mainButtonText?: string;
  padding?: string;
  divider?: boolean;
  buttonSize?: SIZES;
  buttonWidth?: SIZES | string;
}

const Footer: React.FC<FooterProps> = ({
  handleCancel,
  handleMainButton,
  isDisabled,
  mainButtonStyle = BUTTON_THEME.PRIMARY,
  alignment = "center",
  mainButtonText = "generics.save",
  padding,
  divider,
  buttonSize,
  buttonWidth,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  return (
    <>
      {divider ? <Divider /> : null}
      <Box p={padding ? padding : theme.spacers.size16}>
        <Flex justifyContent={alignment}>
          <Button
            width={buttonWidth}
            size={buttonSize || SIZES.SMALL}
            handleClick={handleCancel}
            buttonStyle={BUTTON_THEME.SECONDARY}
          >
            {formatMessage("generics.cancel")}
          </Button>
          <Spacer width={theme.spacers.size32} />
          <Button
            width={buttonWidth}
            size={buttonSize || SIZES.SMALL}
            handleClick={handleMainButton}
            buttonStyle={mainButtonStyle}
            disabled={isDisabled}
          >
            {formatMessage(mainButtonText)}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default Footer;
