import React, { useContext } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Sidebar from "./components/unique/sidebar/Sidebar";
import { FileTreeContext } from "./contexts";
import { FILETREE_TYPES } from "./contexts/FileTreeContext";
import { NotFoundPage, OptionsPage, StudySetPage } from "./pages";

const Routes = () => {
  const { fileTree } = useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];

  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          {firstFolderId && (
            <Redirect to={`/${FILETREE_TYPES.FOLDER}/${firstFolderId}`} />
          )}
        </Route>
        <Route path="/:type/:id" component={OptionsPage} />
        <Route path="/studyMode/:id" component={StudySetPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default withRouter(Routes);
