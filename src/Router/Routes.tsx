import React, { useContext, useEffect } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { FileTreeContext } from "../contexts";
import { LogInSignUpPage, OptionsPage } from "../pages";
import { FILETREE_TYPES } from "../shared";
import CustomSwitch from "./CustomSwitch";

const Routes = () => {
  const { fileTree, getAsset, addAsset, isTreeEmpty } =
    useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
  const folderData = getAsset(FILETREE_TYPES.FOLDER, firstFolderId);

  useEffect(() => {
    // if file tree is empty auto-add one folder
    if (isTreeEmpty) {
      addAsset(FILETREE_TYPES.FOLDER);
    }
  }, [isTreeEmpty]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CustomSwitch>
      <Route exact path="/">
        {firstFolderId && folderData && (
          <Redirect
            to={{
              pathname: firstFolderLink,
              state: { folderData: folderData },
            }}
          />
        )}
      </Route>
      <Route
        path="/:type/:id"
        render={() => <OptionsPage firstFolderId={firstFolderId} />}
      />
      <Route path="/login" render={() => <LogInSignUpPage login={true} />} />
      <Route path="/sign-up" component={LogInSignUpPage} />
    </CustomSwitch>
  );
};

export default withRouter(Routes);
