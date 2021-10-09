import React, { useEffect } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { getSessionCookie } from "../helpers";

type PrivateRouteProps = {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  component?: any;
  children?: any;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  exact = false,
  strict = false,
  component: Component,
  children,
}) => {
  const history = useHistory();
  const cookie = getSessionCookie();

  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useEffect(() => {
    if (!cookie) {
      history.push("/login");
    }
  }, [history, cookie]);

  return (
    <>
      {cookie && (
        <Route path={path} exact={exact} strict={strict} component={Component}>
          {children}
        </Route>
      )}
    </>
  );
};

export default PrivateRoute;
