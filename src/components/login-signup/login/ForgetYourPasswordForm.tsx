import React, { SyntheticEvent, useEffect, useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, SIZES } from "../../../shared";
import { FormattedMessage } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import { isAnyRequiredFieldPristine, validateEmail } from "../../../helpers";
import { Button, Input, Spacer, Text } from "dekked-design-system";
import { useMutation } from "react-query";
import { forgetPassword } from "../../../api";
import ErrorMessage from "../ErrorMessage";
import SendEmail from "../../../assets/images/SendEmail.png";

interface ForgetYourPasswordFormProps {}

const ForgetYourPasswordForm: React.FC<ForgetYourPasswordFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>();

  const {
    mutate: forgetPasswordRequest,
    data,
    isLoading,
  } = useMutation("send-email-to-reset-password", forgetPassword);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    emailAddress && forgetPasswordRequest({ email_address: emailAddress });
  };

  useEffect(() => {
    if (data?.success) {
      setShowErrorMessage(false);
    } else if (data?.success === false) {
      setShowErrorMessage(true);
      setErrorCode(data?.status);
    }
  }, [data?.success, data?.status]);

  const isSubmitButtonDisabled = () => {
    if (!validateEmail(emailAddress)) return true;
    return isAnyRequiredFieldPristine([emailAddress]);
  };

  return (
    <>
      {data?.success ? (
        <>
          <FormattedMessage
            id={"forms.forgetYourPassword.checkYourEmail"}
            values={{ email: emailAddress }}
          />
          <img src={SendEmail} alt="Email sent" width="100%" />
        </>
      ) : (
        <>
          {showErrorMessage && errorCode && (
            <ErrorMessage
              setShowError={setShowErrorMessage}
              errorCode={errorCode}
              custom404Message="forms.forgetYourPassword.userDoesNotExistEmail"
            />
          )}
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
              isLoading={isLoading}
              isDisabled={isSubmitButtonDisabled()}
              type={BUTTON_TYPES.SUBMIT}
            >
              <FormattedMessage id="forms.forgetYourPassword.getResetLink" />
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default ForgetYourPasswordForm;
