import React, { useContext, useEffect } from "react";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { ThemeContext } from "styled-components";
import { Button, Spacer } from "../../../components/common";
import { FormattedMessage } from "react-intl";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { userAtom } from "../../../store";
import { useAtom } from "jotai";
import { useHistory } from "react-router-dom";
import { googleAuthentication } from "../../../api/authentication/googleAuthenticationApi";
import { getSessionCookie, setSessionCookie } from "../../../helpers";

interface GoogleOAuthProps {}

const GoogleOAuth: React.FC<GoogleOAuthProps> = () => {
  const theme = useContext(ThemeContext);
  const [user, setUser] = useAtom(userAtom);
  const history = useHistory();
  const googleId = "281383698502-ho9b8tv17243fcjjcvdslondg6820oko";
  const clientId = `${googleId}.apps.googleusercontent.com`;

  const isLoginResponse = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): response is GoogleLoginResponse => "googleId" in response;

  const responseGoogle = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    if (isLoginResponse(response)) {
      const basicProfile = response.getBasicProfile();

      const authenticationResponse = await googleAuthentication({
        first_name: basicProfile.getGivenName(),
        last_name: basicProfile.getFamilyName(),
        email_address: basicProfile.getEmail(),
        token: response.tokenId,
      });

      console.log(response);

      setUser({
        id: authenticationResponse?.userData?.data?.id,
        first_name: authenticationResponse?.userData?.data?.first_name,
        last_name: authenticationResponse?.userData?.data?.last_name,
        email_address: authenticationResponse?.userData?.data?.email_address,
      });

      console.log(authenticationResponse);

      setSessionCookie(authenticationResponse?.userData?.data?.token);
      if (getSessionCookie()) {
        history.push("/");
      }
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={responseGoogle}
      // onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
      render={(renderProps: { onClick: () => void; disabled?: boolean }) => (
        <Button
          size={SIZES.LARGE}
          fullWidth
          handleClick={renderProps.onClick}
          buttonStyle={BUTTON_THEME.SECONDARY}
        >
          <GoogleIcon size={SIZES.LARGE} />
          <Spacer width={theme.spacers.size16} />
          <FormattedMessage id="forms.oAuth.continueWithGoogle" />
        </Button>
      )}
    />
  );
};

export default GoogleOAuth;
