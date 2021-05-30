import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";
import { Box, Button, Divider, Flex } from "..";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";

type ButtonProps = {
  onClick?: (args: any) => any;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: BUTTON_THEME;
  id?: string;
  text?: string;
  fullWidth?: boolean;
};

type Props = {
  secondaryButton?: ButtonProps;
  primaryButton?: ButtonProps;
  padding?: string;
  divider?: boolean;
  buttonSize?: SIZES;
  buttonWidth?: SIZES | string;
  alignment?: "flex-start" | "center";
  noSecondaryButton?: boolean;
};

const Footer = ({
  secondaryButton,
  primaryButton,
  alignment = "center",
  padding,
  divider,
  buttonWidth,
  buttonSize,
  noSecondaryButton,
}: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {divider && <Divider />}
      <Flex width="100%" justifyContent={alignment} p={padding}>
        <>
          {!noSecondaryButton ? (
            <Box mr={theme.spacers.size32}>
              <Button
                width={buttonWidth}
                size={buttonSize}
                id={secondaryButton?.id}
                buttonStyle={secondaryButton?.style || BUTTON_THEME.SECONDARY}
                type={BUTTON_TYPES.BUTTON}
                isDisabled={secondaryButton?.isDisabled}
                handleClick={secondaryButton?.onClick}
                fullWidth={secondaryButton?.fullWidth}
              >
                <FormattedMessage
                  id={secondaryButton?.text || "generics.cancel"}
                />
              </Button>
            </Box>
          ) : null}
          <Button
            width={buttonWidth}
            size={buttonSize}
            id={primaryButton?.id}
            buttonStyle={primaryButton?.style || BUTTON_THEME.PRIMARY}
            type={BUTTON_TYPES.BUTTON}
            isLoading={primaryButton?.isLoading}
            handleClick={primaryButton?.onClick}
            isDisabled={primaryButton?.isDisabled}
            fullWidth={primaryButton?.fullWidth}
          >
            <FormattedMessage
              id={primaryButton?.text || "generics.saveAndClose"}
            />
          </Button>
        </>
      </Flex>
    </>
  );
};

export default Footer;
