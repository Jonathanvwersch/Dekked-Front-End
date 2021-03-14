import React from "react";
import { Route, Switch } from "react-router-dom";
import { BinderPage, FolderPage, StudySetPage } from "..";
import { FILETREE_TYPES } from "../../contexts/FileTreeContext";
import { SelectedItemContextProvider } from "../../contexts/SelectedItemContext";
import { Sidebar } from "../../components/shared/Sidebar";

const OptionsPage: React.FC = () => {
  return (
    <SelectedItemContextProvider>
      <Sidebar />
      <Switch>
        <Route path={`/${FILETREE_TYPES.FOLDER}/:id`} component={FolderPage} />
        <Route path={`/${FILETREE_TYPES.BINDER}/:id`} component={BinderPage} />
        <Route
          path={`/${FILETREE_TYPES.STUDY_SET}/:id/:tab`}
          component={StudySetPage}
        />
        <Route path={`/:type/:id/study`} component={StudySetPage} />
      </Switch>
    </SelectedItemContextProvider>
  );
};

export default OptionsPage;
