import React from "react";
import { ThemeContext } from "styled-components";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { Spacer, Input, Button } from "../../common";
import { useIntl } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const intl = useIntl();
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext, intl);

  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.email.placeholder", intl)}
        label={formatMessage("forms.email.email", intl)}
        type="email"
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
        {formatMessage("forms.logIn.logIn", intl)}
      </Button>
    </>
  );
};

export default LogInForm;
