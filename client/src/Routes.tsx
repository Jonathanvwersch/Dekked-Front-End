import React, { useContext, useEffect } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { FileTreeContext } from "./contexts";
import { FILETREE_TYPES } from "./contexts/FileTreeContext";
import { LogInSignUpPage, NotFoundPage, OptionsPage } from "./pages";

const Routes = () => {
  const { fileTree, getAsset, handleAddingAsset, isTreeEmpty } = useContext(
    FileTreeContext
  );
  let firstFolderId = Object.keys(fileTree)[0];
  let folderData = getAsset(FILETREE_TYPES.FOLDER, firstFolderId);
  console.log(isTreeEmpty);

  useEffect(() => {
    if (isTreeEmpty) {
      handleAddingAsset(FILETREE_TYPES.FOLDER);
    }
  }, [isTreeEmpty]);

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
