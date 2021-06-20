import React from "react";
import { Switch } from "react-router-dom";
import { NotFoundPage } from "../pages";

const CustomSwitch: React.FC = ({ children }) => (
  <Switch>
    {children}
    <NotFoundPage />
  </Switch>
);

export default CustomSwitch;
