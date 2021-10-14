import React from "react";
import { useRouteMatch } from "react-router-dom";
import { StudyModePage } from "..";
import PrivateRoute from "../../Router/PrivateRoute";

import CustomSwitch from "../../Router/CustomSwitch";
import StudySetPage from "../StudySetPage/StudySetPage";
import FilePage from "../FilePage/FilePage";

interface OptionsPageProps {}

const OptionsPage: React.FC<OptionsPageProps> = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <CustomSwitch>
        <PrivateRoute exact path={`${path}`} component={FilePage} />
        <PrivateRoute exact path={`${path}/:tab`} component={StudySetPage} />
        <PrivateRoute
          exact
          path={`${path}/study/:studyModes`}
          component={StudyModePage}
        />
      </CustomSwitch>
    </>
  );
};

export default OptionsPage;
