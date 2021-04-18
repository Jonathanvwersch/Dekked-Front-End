import React from "react";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { Spacer, Input, Button } from "../../common";
import { useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers();

  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder="Example@dekked.com"
        label="Email address"
        type="email"
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.names.firstNamePlaceholder", intl)}
        label={formatMessage("forms.names.firstName", intl)}
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.names.lastNamePlaceholder", intl)}
        label={formatMessage("forms.names.lastName", intl)}
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.password.currentPassword", intl)}
        type="password"
        label={formatMessage("forms.password.password", intl)}
      />
      <Spacer height={theme.spacers.size48} />
      <Button size={SIZES.LARGE} fullWidth buttonStyle={BUTTON_THEME.PRIMARY}>
        {formatMessage("forms.signUp.signUp", intl)}
      </Button>
    </>
  );
};

export default SignUpForm;
