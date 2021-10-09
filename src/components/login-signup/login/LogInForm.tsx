import React, {
  SyntheticEvent,
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
import { login } from "../../../api";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "react-query";
import { emailFromSignUpAtom, userAtom } from "../../../store";
import { useAtom } from "jotai";
import { FormattedMessage } from "react-intl";
import GoogleOAuth from "../GoogleOAuth/GoogleOAuth";
import { Button, Divider, Flex, Input, Spacer } from "dekked-design-system";
import { InternalLink } from "../../common";
import { AxiosError } from "axios";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailFromSignUp] = useAtom(emailFromSignUpAtom);
  const [emailAddress, setEmailAddress] =
    useState<string | undefined>(emailFromSignUp);
  const [password, setPassword] = useState<string>();
  const [, setUser] = useAtom(userAtom);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const passwordRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const { mutate: logIn, isLoading } = useMutation("log-in", login, {
    onError: (error: AxiosError) => {
      setShowError(true);
      setErrorCode(error?.response?.status);
    },
    onSuccess: (data) => {
      if (data) {
        setSessionCookie(data?.token);
        setUser({
          id: data?.id,
          last_name: data?.first_name,
          first_name: data?.last_name,
          email_address: data?.email_address,
        });
        if (getSessionCookie()) {
          history.push("/");
        }
      }
    },
  });

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress, password]);
  };

  const loginUser = async (emailAddress: string, password: string) => {
    setShowError(false);
    setErrorCode(undefined);
    window.localStorage.setItem("user-email", "");
    logIn({ email_address: emailAddress, password });
  };

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
      <ErrorMessage
        errorCode={errorCode}
        custom404Message="forms.logIn.noUserExists"
        custom401Message="forms.logIn.noUserExists"
        custom400Message="forms.signUp.accountExists"
        setShowError={setShowError}
        showError={showError}
      />
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
          errorMessage={formatMessage("forms.validation.invalidEmail")}
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
        <InternalLink to="/forget-password" textDecoration="underline">
          <FormattedMessage id="forms.forgetYourPassword.forgetYourPassword" />
        </InternalLink>
        <Spacer height={theme.spacers.size32} />
        <Button
          size={SIZES.MEDIUM}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isDisabled={isSubmitButtonDisabled()}
          type={BUTTON_TYPES.SUBMIT}
          isLoading={isLoading}
        >
          <FormattedMessage id="forms.logIn.logIn" />
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
        <GoogleOAuth setErrorCode={setErrorCode} setShowError={setShowError} />
      </form>
    </>
  );
};

export default LogInForm;
