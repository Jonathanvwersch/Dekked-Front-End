import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import ForgetYourPassword from "../components/login-signup/login/ForgetYourPassword";
import { getSessionCookie } from "../helpers";
import { LogInSignUpPage, OptionsPage } from "../pages";
import CustomSwitch from "./CustomSwitch";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <CustomSwitch>
    <Route exact path="/login" render={() => <LogInSignUpPage login />}>
      {getSessionCookie() && <Redirect to="/" />}
    </Route>
    <Route exact path="/forget-password" component={ForgetYourPassword}>
      {getSessionCookie() && <Redirect to="/" />}
    </Route>
    <Route
      exact
      path="/reset-password/:token"
      component={() => <ForgetYourPassword isResetPage />}
    >
      {getSessionCookie() && <Redirect to="/" />}
    </Route>
    <Route exact path="/sign-up" component={LogInSignUpPage}>
      {getSessionCookie() && <Redirect to="/" />}
    </Route>
    <PrivateRoute exact path="/" />
    <PrivateRoute path="/:type/:id" component={OptionsPage} />
  </CustomSwitch>
);

export default withRouter(Routes);
