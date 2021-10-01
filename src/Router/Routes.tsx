import React from "react";
import { withRouter } from "react-router-dom";
import ForgetYourPassword from "../components/login-signup/login/ForgetYourPassword";
import { LogInSignUpPage, OptionsPage } from "../pages";
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
    <PrivateRoute exact path="/" />
    <PrivateRoute path="/:type/:id" component={OptionsPage} />
  </CustomSwitch>
);

export default withRouter(Routes);
