import React from "react";
import { withRouter } from "react-router-dom";
import ForgetYourPassword from "../components/login-signup/login/ForgetYourPassword";
import InnerApp from "../InnerApp";
import { LogInSignUpPage } from "../pages";
import CustomRoute from "./CustomRoute";
import CustomSwitch from "./CustomSwitch";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <CustomSwitch>
    <CustomRoute exact path="/login" render={() => <LogInSignUpPage login />} />
    <CustomRoute exact path="/forget-password" component={ForgetYourPassword} />
    <CustomRoute
      exact
      path="/reset-password/:token"
      component={() => <ForgetYourPassword isResetPage />}
    />
    <CustomRoute exact path="/sign-up" component={LogInSignUpPage} />
    <PrivateRoute path="/" component={InnerApp} />
  </CustomSwitch>
);

export default withRouter(Routes);
