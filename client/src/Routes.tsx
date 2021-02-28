import React, { useContext } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Sidebar from "./components/unique/sidebar/Sidebar";
import { FileTreeContext } from "./contexts";
import { BinderPage, FolderPage, NotFoundPage, StudySetPage } from "./pages";

const Routes = () => {
  const { fileTree } = useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];

  return (
    <>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          {firstFolderId && <Redirect to={`/folder/${firstFolderId}`} />}
        </Route>
        <Route path="/folder/:id" component={FolderPage} />
        <Route path="/binder/:id" component={BinderPage} />
        <Route path="/study_pack/:id" component={StudySetPage} />
        <Route path="/studyMode/:id" component={StudySetPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default withRouter(Routes);
