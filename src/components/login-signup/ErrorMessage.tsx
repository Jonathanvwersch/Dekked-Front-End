import React, { useContext } from "react";
import { Spacer, Text, Card, Flex, IconWrapper } from "../common";
import { FormattedMessage } from "react-intl";
import { ClearIcon, ErrorIcon } from "../../assets";
import { ThemeContext } from "styled-components";

interface LogInFormProps {
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
  errorCode?: number;
}

const LogInForm: React.FC<LogInFormProps> = ({ setShowError, errorCode }) => {
  const theme = useContext(ThemeContext);
  return (
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
              <FormattedMessage
                id={
                  errorCode === 401 || errorCode === 404
                    ? "forms.logIn.noUserExists"
                    : errorCode === 400
                    ? "forms.signUp.accountExists"
                    : "generics.somethingWentWrong"
                }
              />
            </Text>
          </Flex>
          <IconWrapper handleClick={() => setShowError(false)}>
            <ClearIcon color="white" />
          </IconWrapper>
        </Flex>
      </Card>
      <Spacer height={theme.spacers.size32} />
    </>
  );
};

export default LogInForm;
