import React from "react";
import { Spacer, Input, Button } from "../../common";
import { BUTTON_THEME } from "../../common/Button/Button";
import { SIZES } from "../../common/Pages/InsetPage";

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  return (
    <>
      <Input
        size={SIZES.LARGE}
        placeholder="Example@dekked.com"
        label="Email address"
        type="email"
      />
      <Spacer height="16px" />
      <Input size={SIZES.LARGE} placeholder="Elon" label="First name" />
      <Spacer height="16px" />{" "}
      <Input size={SIZES.LARGE} placeholder="Musk" label="Last name" />
      <Spacer height="16px" />
      <Input
        size={SIZES.LARGE}
        placeholder="Current password"
        type="password"
        label="Password"
      />
      <Spacer height="48px" />
      <Button size={SIZES.LARGE} fullWidth buttonStyle={BUTTON_THEME.PRIMARY}>
        Sign up
      </Button>
    </>
  );
};

export default SignUpForm;