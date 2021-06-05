import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { FullPageLoadingSpinner } from "../../components/common";
import { UserContext } from "../../contexts";
import { getSessionCookie, removeCookie } from "../../helpers";

const LogOutPage: React.FC = () => {
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [token, setToken] = useState(getSessionCookie());

  const logoutInterval = setInterval(() => {
    removeCookie();
    setToken(getSessionCookie());
  }, 1000);

  if (!token) {
    clearInterval(logoutInterval);
    console.log("eafdsbo");
    setUser({ firstName: "", lastName: "", id: "", emailAddress: "" });
    history.push("/login");
  }

  return <FullPageLoadingSpinner text="generics.loggingOut" />;
};

export default LogOutPage;
