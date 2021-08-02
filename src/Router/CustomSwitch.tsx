import React from "react";
import { NotFoundPage } from "../pages";
import { Switch } from "react-router-dom";

const CustomSwitch: React.FC = ({ children }) => (
  <Switch>
    {children}
    <NotFoundPage />
  </Switch>
);

export default CustomSwitch;
