import React, { useContext, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { FileTreeContext } from "./contexts";
import { LogInSignUpPage, NotFoundPage, OptionsPage } from "./pages";
import { FILETREE_TYPES } from "./shared";

const Routes = () => {
  const { fileTree, getAsset, handleAddingAsset, isTreeEmpty } = useContext(
    FileTreeContext
  );
  const firstFolderId = Object.keys(fileTree)[0];
  const folderData = getAsset(FILETREE_TYPES.FOLDER, firstFolderId);

  useEffect(() => {
    // if file tree is empty auto-add one folder
    if (isTreeEmpty) {
      handleAddingAsset(FILETREE_TYPES.FOLDER);
    }
  }, [isTreeEmpty]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Switch>
      <Route exact path="/" component={OptionsPage}>
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
      <Route path="/login" render={() => <LogInSignUpPage login={true} />} />
      <Route path="/sign-up" component={LogInSignUpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Routes);
