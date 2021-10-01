import React from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { getSessionCookie } from "../helpers";

type CustomRouteProps = {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  component?: any;
  children?: any;
  render?: () => JSX.Element;
};

const CustomRoute: React.FC<CustomRouteProps> = ({
  path,
  exact = false,
  strict = false,
  component: Component,
  render,
}) => {
  return (
    <Route
      path={path}
      exact={exact}
      strict={strict}
      component={Component}
      render={render}
    >
      {getSessionCookie() && <Redirect to="/" />}
    </Route>
  );
};

export default CustomRoute;
