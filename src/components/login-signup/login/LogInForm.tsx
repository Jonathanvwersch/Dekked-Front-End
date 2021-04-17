import React from "react";
import { ThemeContext } from "styled-components/macro";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { Spacer, Input, Button } from "../../common";
import { usePageSetupHelpers } from "../../../hooks";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers(ThemeContext);

  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.email.placeholder")}
        label={formatMessage("forms.email.email")}
        type="email"
      />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder={formatMessage("forms.password.currentPassword")}
        type="password"
        label={formatMessage("forms.password.password")}
      />
      <Spacer height={theme.spacers.size48} />
      <Button size={SIZES.LARGE} fullWidth buttonStyle={BUTTON_THEME.PRIMARY}>
        {formatMessage("forms.logIn.logIn")}
      </Button>
    </>
  );
};

export default LogInForm;
