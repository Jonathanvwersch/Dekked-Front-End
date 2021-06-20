import React from "react";
import { withRouter } from "react-router-dom";
import { OptionsPage, ErrorPage } from "../pages";
import CustomSwitch from "./CustomSwitch";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <CustomSwitch>
    <PrivateRoute exact path="/" />
    <PrivateRoute exact path="/error" component={ErrorPage} />
    <PrivateRoute path="/:type/:id" component={OptionsPage} />
  </CustomSwitch>
);

export default withRouter(Routes);
