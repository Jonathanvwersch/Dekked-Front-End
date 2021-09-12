import React, { SyntheticEvent, useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { FormattedMessage } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import { isAnyRequiredFieldPristine, validateEmail } from "../../../helpers";
import { Button, Input, Spacer, Text } from "dekked-design-system";

interface ForgetYourPasswordFormProps {}

const ForgetYourPasswordForm: React.FC<ForgetYourPasswordFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailAddress, setEmailAddress] = useState<string>();

  const handleSubmit = (event: SyntheticEvent) => {
    return null;
  };

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Text as="p" fontSize={theme.typography.fontSizes.size16}>
          <FormattedMessage id="forms.forgetYourPassword.bodyText" />
        </Text>
        <Spacer height={theme.spacers.size32} />
        <Input
          size={SIZES.MEDIUM}
          placeholder="Example@dekked.com"
          type="email"
          autoFocus
          id="EmailAddress"
          onChange={(e) => setEmailAddress(e.target.value)}
          validate={() => validateEmail(emailAddress)}
          errorMessage={formatMessage("forms.validation.invalidEmail")}
          required
        />
        <Spacer height={theme.spacers.size16} />
        <Button
          size={SIZES.MEDIUM}
          fullWidth
          buttonStyle={BUTTON_THEME.PRIMARY}
          isLoading={false}
          isDisabled={isSubmitButtonDisabled()}
          type={BUTTON_TYPES.SUBMIT}
        >
          <FormattedMessage id="forms.forgetYourPassword.getResetLink" />
        </Button>
      </form>
    </>
  );
};

export default ForgetYourPasswordForm;
