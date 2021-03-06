import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { FormattedMessage, useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import {
  isAnyRequiredFieldPristine,
  validateEmail,
  validatePassword,
} from "../../../helpers";
import { register } from "../../../api";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { emailFromSignUpAtom } from "../../../store";
import { useAtom } from "jotai";
import { GoogleOAuth } from "..";
import { Button, Divider, Flex, Input, Spacer } from "dekked-design-system";
import { Tooltip } from "../../common";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const intl = useIntl();
  const history = useHistory();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const emailRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);
  const { mutate: signUp, data, isLoading } = useMutation("register", register);
  const [, setEmailFromSignUp] = useAtom(emailFromSignUpAtom);

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    if (password !== repeatPassword || !validatePassword(password)) return true;
    return isAnyRequiredFieldPristine([
      emailAddress,
      firstName,
      password,
      repeatPassword,
      lastName,
    ]);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    setShowError(false);
    setErrorCode(undefined);
    event.preventDefault();

    emailAddress &&
      firstName &&
      lastName &&
      password &&
      signUp({
        email_address: emailAddress,
        first_name: firstName,
        last_name: lastName,
        password: password,
      });

    setEmailFromSignUp(emailAddress);
  };

  useEffect(() => {
    if (data?.status !== 200) {
      setShowError(true);
      setErrorCode(data?.status);
    }
    if (data?.status === 200) {
      history.push("/login");
    }
    if (errorCode === 400) {
      emailRef.current?.focus();
    }
  }, [data, history, emailRef, errorCode]);

  return (
    <>
      <ErrorMessage
        setShowError={setShowError}
        errorCode={errorCode}
        custom404Message="forms.logIn.noUserExists"
        custom401Message="forms.logIn.noUserExists"
        custom400Message="forms.signUp.accountExists"
        showError={showError}
      />
      <form onSubmit={handleSubmit}>
        <GoogleOAuth setShowError={setShowError} setErrorCode={setErrorCode} />
        <Spacer height={theme.spacers.size32} />
        <Flex>
          <Divider color={theme.colors.grey2} />
          <Spacer width={theme.spacers.size20} />
          <FormattedMessage id="generics.or" />
          <Spacer width={theme.spacers.size20} />
          <Divider color={theme.colors.grey2} />
        </Flex>
        <Spacer height={theme.spacers.size32} />
        <Input
          size={SIZES.MEDIUM}
          placeholder="Example@dekked.com"
          label={formatMessage("forms.email.emailAddress")}
          type="email"
          autoFocus
          inputRef={emailRef}
          id="EmailAddress"
          onChange={(e) => setEmailAddress(e.target.value)}
          validate={() => validateEmail(emailAddress)}
          errorMessage={formatMessage("forms.validation.invalidEmail")}
          required
        />
        <Spacer height={theme.spacers.size16} />
        <Flex>
          <Input
            width="50%"
            size={SIZES.MEDIUM}
            placeholder={formatMessage(
              "forms.names.firstNamePlaceholder",
              intl
            )}
            label={formatMessage("forms.names.firstName", intl)}
            id="FirstName"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Spacer width={theme.spacers.size16} />
          <Input
            width="50%"
            size={SIZES.MEDIUM}
            placeholder={formatMessage("forms.names.lastNamePlaceholder", intl)}
            label={formatMessage("forms.names.lastName", intl)}
            id="LastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Flex>
        <Spacer height={theme.spacers.size16} />
        <Input
          size={SIZES.MEDIUM}
          placeholder={formatMessage("forms.password.password", intl)}
          type="password"
          label={formatMessage("forms.password.password", intl)}
          id="Password"
          validate={() => validatePassword(password)}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={formatMessage("forms.password.length")}
          required
          showPassword
          clearButton={false}
        />
        <Spacer height={theme.spacers.size16} />
        <Input
          size={SIZES.MEDIUM}
          placeholder={formatMessage("forms.password.repeatPassword", intl)}
          type="password"
          label={formatMessage("forms.password.repeatPassword", intl)}
          id="RepeatPassword"
          onChange={(e) => setRepeatPassword(e.target.value)}
          validate={() => password === repeatPassword}
          errorMessage={
            password === repeatPassword
              ? ""
              : formatMessage("forms.validation.passwordsNoMatch")
          }
          required
          showPassword
          clearButton={false}
        />
        <Spacer height={theme.spacers.size32} />
        <Tooltip
          id="DisabledSubmitButton"
          text="tooltips.forms.disabledButton"
          isActive={isSubmitButtonDisabled()}
        >
          <Button
            size={SIZES.MEDIUM}
            fullWidth
            buttonStyle={BUTTON_THEME.PRIMARY}
            isDisabled={isSubmitButtonDisabled()}
            isLoading={isLoading}
            type={BUTTON_TYPES.SUBMIT}
          >
            {formatMessage("forms.signUp.signUp", intl)}
          </Button>
        </Tooltip>
      </form>
    </>
  );
};

export default SignUpForm;
