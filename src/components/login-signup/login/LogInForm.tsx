import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import { Spacer, Input, Button } from "../../common";
import { BUTTON_THEME } from "../../common/Button/Button";

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
  const theme = useContext(ThemeContext);
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
        placeholder="Current password"
        type="password"
        label="Password"
      />
      <Spacer height={theme.spacers.size48} />
      <Button size={SIZES.LARGE} fullWidth buttonStyle={BUTTON_THEME.PRIMARY}>
        Log in
      </Button>
    </>
  );
};

export default LogInForm;
