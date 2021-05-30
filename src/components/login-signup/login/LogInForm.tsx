import React, { useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { Spacer, Input, Button, Tooltip } from "../../common";
import { usePageSetupHelpers } from "../../../hooks";
import { isAnyRequiredFieldPristine, validateEmail } from "../../../helpers";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress, password]);
  };

  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.email.placeholder")}
        label={formatMessage("forms.email.emailAddress")}
        type="email"
        validate={() => validateEmail(emailAddress)}
        onChange={(e) => setEmailAddress(e.target.value)}
        errorMessage="forms.validation.invalidEmail"
        required
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.password.currentPassword")}
        type="password"
        label={formatMessage("forms.password.password")}
        onChange={(e) => setPassword(e.target.value)}
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
          {formatMessage("forms.logIn.logIn")}
        </Button>
      </Tooltip>
    </>
  );
};

export default LogInForm;
