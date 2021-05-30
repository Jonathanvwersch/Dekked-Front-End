import React, { useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { Spacer, Input, Button, Tooltip } from "../../common";
import { useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import {
  isAnyRequiredFieldPristine,
  validateEmail,
  validatePassword,
} from "../../../helpers";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    if (password !== repeatPassword) return true;
    return isAnyRequiredFieldPristine([
      emailAddress,
      firstName,
      password,
      repeatPassword,
    ]);
  };

  return (
    <form>
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
      />
      <Spacer height={theme.spacers.size48} />
      <Tooltip id="DisabledSubmitButton" text="tooltips.forms.disabledButton">
        <Button
          size={SIZES.LARGE}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isDisabled={isSubmitButtonDisabled()}
          type={BUTTON_TYPES.SUBMIT}
        >
          {formatMessage("forms.signUp.signUp", intl)}
        </Button>
      </Tooltip>
    </form>
  );
};

export default SignUpForm;
