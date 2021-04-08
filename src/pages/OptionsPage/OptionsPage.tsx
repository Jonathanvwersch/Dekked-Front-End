import React, { useContext, useLayoutEffect } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { SelectedItemContextProvider } from "../../contexts/SelectedItemContext";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES, Params } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";
import { FileTreeContext } from "../../contexts";

interface OptionsPageProps {
  firstFolderId: string;
}

const OptionsPage: React.FC<OptionsPageProps> = ({ firstFolderId }) => {
  const { type, id } = useParams<Params>();
  const { getAsset } = useContext(FileTreeContext);
  const history = useHistory();
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;

  // if id doesn't exist, just push to first folder
  useLayoutEffect(() => {
    if (!getAsset(type, id) && firstFolderId) history.push(firstFolderLink);
  }, [type, id, history, getAsset, firstFolderId, firstFolderLink]);

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
