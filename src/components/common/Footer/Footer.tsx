import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import styled, { ThemeContext } from "styled-components";
import { Box, Button, Flex } from "..";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";

type ButtonProps = {
  onClick?: (args: any) => any;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: BUTTON_THEME;
  id?: string;
  text?: string;
  fullWidth?: boolean;
  buttonType?: BUTTON_TYPES;
};

type Props = {
  secondaryButton?: ButtonProps;
  primaryButton?: ButtonProps;
  padding?: string;
  divider?: boolean;
  buttonSize?: SIZES;
  buttonWidth?: SIZES | string;
  alignment?: "flex-start" | "center" | "flex-end";
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
      <StyledFlex width="100%" justifyContent={alignment} p={padding} divider>
        <>
          {!noSecondaryButton ? (
            <Box mr={theme.spacers.size32}>
              <Button
                width={buttonWidth}
                size={buttonSize}
                id={secondaryButton?.id}
                buttonStyle={secondaryButton?.style || BUTTON_THEME.SECONDARY}
                type={secondaryButton?.buttonType}
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
            type={primaryButton?.buttonType}
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
      </StyledFlex>
    </>
  );
};

const StyledFlex = styled(Flex)<{ divider: boolean }>`
  border-top: ${({ theme, divider }) =>
    divider && `solid ${theme.colors.grey2} 1px`};
`;

export default Footer;
