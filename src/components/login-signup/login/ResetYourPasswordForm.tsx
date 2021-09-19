import React, { SyntheticEvent, useEffect, useState } from "react";
import { BUTTON_THEME, BUTTON_TYPES, Params, SIZES } from "../../../shared";
import { FormattedMessage } from "react-intl";
import { usePageSetupHelpers } from "../../../hooks";
import { isAnyRequiredFieldPristine, validatePassword } from "../../../helpers";
import { Button, Input, Spacer } from "dekked-design-system";

import ErrorMessage from "../ErrorMessage";
import { useMutation } from "react-query";
import { resetPassword } from "../../../api";
import { useHistory, useParams } from "react-router-dom";

interface ForgetYourPasswordFormProps {}

const ForgetYourPasswordForm: React.FC<ForgetYourPasswordFormProps> = () => {
  const { theme, formatMessage } = usePageSetupHelpers();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorCode, setErrorCode] = useState<number>();
  const { token } = useParams<Params>();
  const history = useHistory();

  const isSubmitButtonDisabled = () => {
    if (password !== repeatPassword) return true;
    return isAnyRequiredFieldPristine([password, repeatPassword]);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    password && token && resetPasswordRequest({ newPassword: password, token });
  };

  const {
    mutate: resetPasswordRequest,
    data,
    isLoading,
  } = useMutation("send-email-to-reset-password", resetPassword);

  useEffect(() => {
    if (data?.status === 200) {
      setShowErrorMessage(false);
    } else if (data?.status && data?.status !== 200) {
      setShowErrorMessage(true);
      setErrorCode(data?.status);
    }
  }, [data?.status]);

  return (
    <>
      {data?.status === 200 ? (
        <>
          <FormattedMessage id="forms.forgetYourPassword.passwordReset" />
          <Spacer height={theme.spacers.size32} />
          <Button
            size={SIZES.MEDIUM}
            fullWidth
            handleClick={() => history.push("/login")}
          >
            <FormattedMessage id="forms.forgetYourPassword.goToLogin" />
          </Button>
        </>
      ) : (
        <>
          <ErrorMessage
            setShowError={setShowErrorMessage}
            showError={showErrorMessage}
            errorCode={errorCode}
            custom404Message="forms.forgetYourPassword.userDoesNotExistToken"
            custom400Message="forms.forgetYourPassword.passwordResetExpired"
          />
          <form onSubmit={handleSubmit}>
            <Input
              size={SIZES.MEDIUM}
              placeholder={formatMessage("forms.password.newPassword")}
              type="password"
              label={formatMessage("forms.password.newPassword")}
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              errorMessage={formatMessage("forms.password.length")}
              required
              validate={() => validatePassword(password)}
              showPassword
              clearButton={false}
            />
            <Spacer height={theme.spacers.size16} />
            <Input
              size={SIZES.MEDIUM}
              placeholder={formatMessage("forms.password.repeatPassword")}
              type="password"
              label={formatMessage("forms.password.repeatPassword")}
              id="RepeatPassword"
              onChange={(e) => setRepeatPassword(e.target.value)}
              validate={() => password === repeatPassword}
              errorMessage={
                password === repeatPassword
                  ? ""
                  : formatMessage("forms.validation.passwordsNoMatch")
              }
              required
              showPassword
              clearButton={false}
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
              <FormattedMessage id="forms.forgetYourPassword.resetPassword" />
            </Button>
          </form>
        </>
      )}
    </>
  );
};

export default ForgetYourPasswordForm;
