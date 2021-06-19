import React from "react";
import { withRouter } from "react-router-dom";
import { OptionsPage } from "../pages";
import CustomSwitch from "./CustomSwitch";
import PrivateRoute from "./PrivateRoute";

const Routes = () => (
  <CustomSwitch>
    <PrivateRoute exact path="/" />
    <PrivateRoute path="/:type/:id" component={OptionsPage} />
  </CustomSwitch>
);

export default withRouter(Routes);
