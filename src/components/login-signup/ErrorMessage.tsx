import React, { ReactNode, useContext } from "react";
import { Spacer, Text, Card, Flex, IconWrapper } from "dekked-design-system";
import { FormattedMessage } from "react-intl";
import { ThemeContext } from "styled-components";
import { ClearIcon, ErrorIcon } from "dekked-design-system";

interface LogInFormProps {
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  errorCode?: number;
  custom404Message?: string;
  custom400Message?: string;
  custom401Message?: string;
  custom500Message?: string;
  messageValue?: Record<string, ReactNode> | undefined;
}

const LogInForm: React.FC<LogInFormProps> = ({
  setShowError,
  errorCode,
  custom404Message,
  custom400Message,
  custom401Message,
  custom500Message,
  showError,
  messageValue,
}) => {
  const theme = useContext(ThemeContext);

  const message = () => {
    if (custom400Message && errorCode === 400) {
      return custom400Message;
    } else if (custom404Message && errorCode === 404) {
      return custom404Message;
    } else if (custom401Message && errorCode === 401) {
      return custom401Message;
    } else if (custom500Message && errorCode === 500) {
      return custom500Message;
    }

    return "generics.somethingWentWrong";
  };

  return (
    <>
      {errorCode && showError && (
        <>
          <Card backgroundColor={theme.colors.danger} opacity="75%">
            <Flex justifyContent="space-between">
              <Flex>
                <ErrorIcon color="white" />
                <Spacer width={theme.spacers.size8} />
                <Text
                  textAlign="center"
                  fontColor="white"
                  fontSize={theme.typography.fontSizes.size14}
                >
                  <FormattedMessage id={message()} values={messageValue} />
                </Text>
              </Flex>
              <IconWrapper handleClick={() => setShowError(false)}>
                <ClearIcon color="white" />
              </IconWrapper>
            </Flex>
          </Card>
          <Spacer height={theme.spacers.size32} />
        </>
      )}
    </>
  );
};

export default LogInForm;
