import React from "react";
import ForgetYourPassword from "../components/login-signup/login/ForgetYourPassword";
import { LogInSignUpPage, OptionsPage } from "../pages";
import HomePage from "../pages/HomePage/HomePage";
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
    <PrivateRoute exact path={["/", "/home"]} component={HomePage} />
    <PrivateRoute path="/:type/:id" component={OptionsPage} />
  </CustomSwitch>
);

export default Routes;
