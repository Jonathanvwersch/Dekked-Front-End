import React, { useContext } from "react";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { ThemeContext } from "styled-components";
import { FormattedMessage } from "react-intl";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { userAtom } from "../../../store";
import { useAtom } from "jotai";
import { useHistory } from "react-router-dom";
import { googleAuthentication } from "../../../api";
import { getSessionCookie, setSessionCookie } from "../../../helpers";
import { config } from "../../../config";
import { Button, GoogleIcon, Spacer } from "dekked-design-system";

interface GoogleOAuthProps {
  setShowError?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorCode?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const GoogleOAuth: React.FC<GoogleOAuthProps> = ({
  setErrorCode,
  setShowError,
}) => {
  const theme = useContext(ThemeContext);
  const [, setUser] = useAtom(userAtom);
  const history = useHistory();
  const clientId = `${config.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`;

  const isLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse => "googleId" in response;

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (isLoginResponse(response)) {
      const basicProfile = response.getBasicProfile();

      const authenticationResponse = await googleAuthentication({
        first_name: basicProfile.getGivenName(),
        last_name: basicProfile.getFamilyName(),
        email_address: basicProfile.getEmail(),
        token: response.tokenId,
      });

      setUser({
        id: authenticationResponse?.id,
        first_name: authenticationResponse?.first_name,
        last_name: authenticationResponse?.last_name,
        email_address: authenticationResponse?.email_address,
      });

      if (authenticationResponse?.token)
        setSessionCookie(authenticationResponse?.token);
      else {
        setShowError && setShowError(true);
        setErrorCode && setErrorCode(500);
      }

      if (getSessionCookie()) {
        history.push("/");
      }
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps: { onClick: () => void; disabled?: boolean }) => (
        <Button
          size={SIZES.MEDIUM}
          fullWidth
          isDisabled={renderProps.disabled}
          handleClick={renderProps.onClick}
          buttonStyle={BUTTON_THEME.SECONDARY}
        >
          <GoogleIcon size={SIZES.LARGE} />
          <Spacer width={theme.spacers.size8} />
          <FormattedMessage id="forms.oAuth.continueWithGoogle" />
        </Button>
      )}
    />
  );
};

export default GoogleOAuth;
