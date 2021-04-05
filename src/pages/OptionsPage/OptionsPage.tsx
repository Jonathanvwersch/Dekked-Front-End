import React from "react";
import { Route } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { SelectedItemContextProvider } from "../../contexts/SelectedItemContext";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";

const OptionsPage: React.FC = () => {
  return (
    <SelectedItemContextProvider>
      <Sidebar />
      <CustomSwitch>
        <Route
          exact
          path={`/${FILETREE_TYPES.FOLDER}/:id`}
          component={FolderPage}
        />
        <Route path={`/${FILETREE_TYPES.BINDER}/:id`} component={BinderPage} />
        <Route
          exact
          path={`/${FILETREE_TYPES.STUDY_SET}/:id/:tab`}
          component={StudySetPage}
        />
        <Route
          exact
          path={`/:type/:id/study/:studyModes`}
          component={StudyModePage}
        />
      </CustomSwitch>
    </SelectedItemContextProvider>
  );
};

export default OptionsPage;
