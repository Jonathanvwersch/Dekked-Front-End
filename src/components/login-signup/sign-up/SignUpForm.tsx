import React, { useState } from "react";
import { BUTTON_THEME, SIZES } from "../../../shared";
import {
  Spacer,
  Input,
  Button,
  Tooltip,
  GeneralModal,
  H1,
  Footer,
} from "../../common";
import { FormattedMessage, useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import {
  isAnyRequiredFieldPristine,
  validateEmail,
  validatePassword,
} from "../../../helpers";
import { register } from "../../../services/authentication/register";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

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
  const [accountExists, setAccountExists] = useState<boolean>(false);
  const { mutate: signUp, data, isLoading } = useMutation("register", register);

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    if (password !== repeatPassword) return true;
    return isAnyRequiredFieldPristine([
      emailAddress,
      firstName,
      password,
      repeatPassword,
      lastName,
    ]);
  };

  const handleSubmit = () => {
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
    if (!data?.success) {
      setAccountExists(true);
    } else {
      history.push("/login");
    }
  };

  const header = (
    <H1 styledAs="h5">
      <FormattedMessage id="forms.signUp.accountExists" />
    </H1>
  );

  const footer = (
    <Footer
      padding="0px"
      primaryButton={{
        onClick: () => setAccountExists(false),
        style: BUTTON_THEME.PRIMARY,
        text: "generics.okay",
        fullWidth: true,
      }}
      noSecondaryButton
      buttonSize={SIZES.MEDIUM}
    />
  );

  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder="Example@dekked.com"
        label={formatMessage("forms.email.emailAddress")}
        type="email"
        id="EmailAddress"
        onChange={(e) => setEmailAddress(e.target.value)}
        validate={() => validateEmail(emailAddress)}
        errorMessage="forms.validation.invalidEmail"
        required
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.names.firstNamePlaceholder", intl)}
        label={formatMessage("forms.names.firstName", intl)}
        id="FirstName"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.names.lastNamePlaceholder", intl)}
        label={formatMessage("forms.names.lastName", intl)}
        id="LastName"
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.password.password", intl)}
        type="password"
        label={formatMessage("forms.password.password", intl)}
        id="Password"
        validate={() => validatePassword(password)}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage="forms.password.length"
        required
        showPassword
        clearButton={false}
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.password.repeatPassword", intl)}
        type="password"
        label={formatMessage("forms.password.repeatPassword", intl)}
        id="RepeatPassword"
        onChange={(e) => setRepeatPassword(e.target.value)}
        validate={() => password === repeatPassword}
        errorMessage={
          password === repeatPassword ? "" : "forms.validation.passwordsNoMatch"
        }
        required
        showPassword
        clearButton={false}
      />
      <Spacer height={theme.spacers.size48} />
      <Tooltip
        id="DisabledSubmitButton"
        text="tooltips.forms.disabledButton"
        isActive={isSubmitButtonDisabled()}
      >
        <Button
          size={SIZES.LARGE}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isDisabled={isSubmitButtonDisabled()}
          handleClick={() => handleSubmit()}
          isLoading={data?.success && isLoading}
        >
          {formatMessage("forms.signUp.signUp", intl)}
        </Button>
      </Tooltip>
      <GeneralModal
        isOpen={accountExists}
        handleClose={() => setAccountExists(false)}
        header={header}
        footer={footer}
      >
        <FormattedMessage
          id="forms.signUp.loginOrNewEmail"
          values={{ email: emailAddress }}
        />
      </GeneralModal>
    </>
  );
};

export default SignUpForm;
