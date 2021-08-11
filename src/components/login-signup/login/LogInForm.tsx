import React, {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import {
  getSessionCookie,
  isAnyRequiredFieldPristine,
  setSessionCookie,
  validateEmail,
} from "../../../helpers";

import { useHistory } from "react-router-dom";
import { login } from "../../../api/authentication/loginApi";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "react-query";
import { emailFromSignUpAtom, userAtom } from "../../../store";
import { useAtom } from "jotai";
import { FormattedMessage } from "react-intl";
import GoogleOAuth from "../GoogleOAuth/GoogleOAuth";
import { Button, Divider, Flex, Input, Spacer } from "dekked-design-system";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailFromSignUp] = useAtom(emailFromSignUpAtom);
  const [emailAddress, setEmailAddress] =
    useState<string | undefined>(emailFromSignUp);
  const [password, setPassword] = useState<string>();
  const [, setUser] = useAtom(userAtom);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate: logIn, data, isLoading } = useMutation("log-in", login);

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress, password]);
  };

  const history = useHistory();

  const loginUser = async (emailAddress: string, password: string) => {
    setErrorMessage(false);
    setErrorCode(undefined);
    window.localStorage.setItem("user-email", "");
    logIn({ email_address: emailAddress, password });
  };

  useEffect(() => {
    if (!data?.userData?.success) {
      setErrorMessage(!data?.userData?.success);
      setErrorCode(data?.errorCode);
    } else if (data?.userData?.success) {
      const token = data?.userData?.data?.token;
      setSessionCookie(token);
      setUser({
        id: data?.userData?.data?.id,
        last_name: data?.userData?.data?.first_name,
        first_name: data?.userData?.data?.last_name,
        email_address: data?.userData?.data?.email_address,
      });
      const logInInterval = setInterval(() => {
        setSessionCookie(token);
      }, 1000);

      if (getSessionCookie()) {
        clearInterval(logInInterval);
        history.push("/");
      }
    }
  }, [data, history, setUser]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    emailAddress && password && loginUser(emailAddress, password);
  };

  useLayoutEffect(() => {
    if (emailAddress) passwordRef.current?.focus();
    // eslint-disable-next-line
  }, [passwordRef]);

  return (
    <>
      {errorMessage && errorCode && (
        <ErrorMessage setShowError={setErrorMessage} errorCode={errorCode} />
      )}
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
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
          inputRef={passwordRef}
          size={SIZES.MEDIUM}
          placeholder={formatMessage("forms.password.currentPassword")}
          type="password"
          label={formatMessage("forms.password.password")}
          onChange={(e) => setPassword(e.target.value)}
          showPassword
          clearButton={false}
        />
        <Spacer height={theme.spacers.size32} />
        <Button
          size={SIZES.LARGE}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isDisabled={isSubmitButtonDisabled()}
          type={BUTTON_TYPES.SUBMIT}
          isLoading={isLoading}
        >
          {formatMessage("forms.logIn.logIn")}
        </Button>
        <Spacer height={theme.spacers.size32} />
        <Flex>
          <Divider color={theme.colors.grey2} />
          <Spacer width={theme.spacers.size20} />
          <FormattedMessage id="generics.or" />
          <Spacer width={theme.spacers.size20} />
          <Divider color={theme.colors.grey2} />
        </Flex>
        <Spacer height={theme.spacers.size32} />
        <GoogleOAuth
          setErrorCode={setErrorCode}
          setErrorMessage={setErrorMessage}
        />
      </form>
    </>
  );
};

export default LogInForm;
