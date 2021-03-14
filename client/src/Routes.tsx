import React, { useContext } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { FileTreeContext } from "./contexts";
import { FILETREE_TYPES } from "./contexts/FileTreeContext";
import { NotFoundPage, OptionsPage } from "./pages";

const Routes = () => {
  const { fileTree, getAsset } = useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];
  const folderData = getAsset(FILETREE_TYPES.FOLDER, firstFolderId);

  return (
    <Switch>
      <Route exact path="/">
        {firstFolderId && folderData && (
          <Redirect
            to={{
              pathname: `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`,
              state: { folderData: folderData },
            }}
          />
        )}
      </Route>
      <Route path="/:type/:id" component={OptionsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Routes);
