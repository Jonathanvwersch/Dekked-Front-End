import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import {
  Spacer,
  Input,
  Button,
  Text,
  Card,
  Flex,
  IconWrapper,
} from "../../common";
import { usePageSetupHelpers } from "../../../hooks";
import {
  getSessionCookie,
  isAnyRequiredFieldPristine,
  setSessionCookie,
  validateEmail,
} from "../../../helpers";
import { FormattedMessage } from "react-intl";
import { ClearIcon, ErrorIcon } from "../../../assets";
import { useHistory } from "react-router-dom";
import { login } from "../../../services/authentication/login";
import { UserContext } from "../../../contexts";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const emailFromSignUp = window.localStorage.getItem("user-email") || "";
  const [emailAddress, setEmailAddress] = useState<string>(emailFromSignUp);
  const [password, setPassword] = useState<string>();
  const [wrongEmailOrPassword, setWrongEmailOrPassword] =
    useState<boolean>(false);
  const { setUser } = useContext(UserContext);

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress, password]);
  };

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>();
  const history = useHistory();

  const loginUser = async (emailAddress: string, password: string) => {
    window.localStorage.setItem("user-email", "");
    setIsLoggingIn(true);
    const response = await login({ email_address: emailAddress, password });
    setErrorCode(response?.status);
    if (response.json?.success) {
      const token = response?.json?.data?.token;
      const userId = response?.json?.data?.id;
      const firstName = response?.json?.data?.first_name;
      const lastName = response?.json?.data?.last_name;
      const emailAddress = response?.json?.data?.email_address;
      setUser({ id: userId, firstName, lastName, emailAddress });
      setSessionCookie(token);

      const logInInterval = setInterval(() => {
        setSessionCookie(token);
      }, 1000);

      if (getSessionCookie()) {
        clearInterval(logInInterval);
        history.push("/");
      }
    } else {
      setIsLoggingIn(false);
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    emailAddress && password && loginUser(emailAddress, password);
  };

  useEffect(() => {
    setWrongEmailOrPassword(Boolean(errorCode === 401 || errorCode === 404));
  }, [errorCode, isLoggingIn]);

  return (
    <>
      {wrongEmailOrPassword && (
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
                  <FormattedMessage id="forms.logIn.noUserExists" />
                </Text>
              </Flex>
              <IconWrapper handleClick={() => setWrongEmailOrPassword(false)}>
                <ClearIcon color="white" />
              </IconWrapper>
            </Flex>
          </Card>
          <Spacer height={theme.spacers.size32} />
        </>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          size={SIZES.MEDIUM}
          defaultValue={emailFromSignUp}
          placeholder={formatMessage("forms.email.placeholder")}
          label={formatMessage("forms.email.emailAddress")}
          type="email"
          validate={() => validateEmail(emailAddress)}
          onChange={(e) => setEmailAddress(e.target.value)}
          errorMessage="forms.validation.invalidEmail"
        />
        <Spacer height={theme.spacers.size16} />
        <Input
          size={SIZES.MEDIUM}
          placeholder={formatMessage("forms.password.currentPassword")}
          type="password"
          label={formatMessage("forms.password.password")}
          onChange={(e) => setPassword(e.target.value)}
          showPassword
          clearButton={false}
        />
        <Spacer height={theme.spacers.size48} />
        <Button
          size={SIZES.LARGE}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isDisabled={isSubmitButtonDisabled()}
          type={BUTTON_TYPES.SUBMIT}
          isLoading={isLoggingIn}
        >
          {formatMessage("forms.logIn.logIn")}
        </Button>
      </form>
    </>
  );
};

export default LogInForm;
