import { isEmpty } from "lodash";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { FullPageLoadingSpinner } from "../../components/common";
import { AuthenticationContext } from "../../contexts";
import { getSessionCookie, removeCookie } from "../../helpers";

const LogOutPage: React.FC = () => {
  const history = useHistory();
  const { setUser } = useContext(AuthenticationContext);
  const [token, setToken] = useState(getSessionCookie());

  const logoutInterval = setInterval(() => {
    removeCookie();
    setToken(getSessionCookie());
  }, 1000);

  if (!token) {
    clearInterval(logoutInterval);
    console.log(token);
    setUser({ firstName: "", lastName: "", id: "", emailAddress: "" });
    history.push("/login");
  }

  return <FullPageLoadingSpinner text="generics.loggingOut" />;
};

export default LogOutPage;
