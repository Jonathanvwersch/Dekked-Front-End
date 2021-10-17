import { FullPageLoadingSpinner } from "dekked-design-system";
import { useAtom } from "jotai";
import React, { useLayoutEffect } from "react";
import { Route } from "react-router";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { getSessionCookie } from "../helpers";
import { useInitialiseApp } from "../hooks";
import { isAppLoadingAtom } from "../store";

type PrivateRouteProps = {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  component?: any;
  children?: any;
  render?:
    | ((
        props: RouteComponentProps<
          {
            [x: string]: string | undefined;
          },
          any,
          unknown
        >
      ) => React.ReactNode)
    | undefined;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  exact = false,
  strict = false,
  component: Component,
  children,
  render,
}) => {
  const history = useHistory();
  const cookie = getSessionCookie();
  const [isLoading] = useAtom(isAppLoadingAtom);
  useInitialiseApp();

  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useLayoutEffect(() => {
    if (!cookie) {
      history.push("/login");
    }
  }, [history, cookie]);

  return (
    <>
      {cookie && !isLoading ? (
        <Route
          path={path}
          exact={exact}
          strict={strict}
          component={Component}
          render={render}
        >
          {children}
        </Route>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default PrivateRoute;
