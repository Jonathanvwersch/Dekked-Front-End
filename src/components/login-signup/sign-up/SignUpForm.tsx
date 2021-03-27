import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import { Spacer, Input, Button } from "../../common";
import { BUTTON_THEME } from "../../common/Button/Button";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
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
      <Input size={SIZES.LARGE} placeholder="Tim" label="First name" />
      <Spacer height={theme.spacers.size16} />
      <Input size={SIZES.LARGE} placeholder="Berners-Lee" label="Last name" />
      <Spacer height={theme.spacers.size16} />
      <Input
        size={SIZES.LARGE}
        placeholder="Current password"
        type="password"
        label="Password"
      />
      <Spacer height={theme.spacers.size48} />
      <Button size={SIZES.LARGE} fullWidth buttonStyle={BUTTON_THEME.PRIMARY}>
        Sign up
      </Button>
    </>
  );
};

export default SignUpForm;
