import React, { useContext, useMemo } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { SelectedItemContextProvider } from "../../contexts/SelectedItemContext";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES, Params } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";
import { FileTreeContext } from "../../contexts";
import { isEmpty } from "lodash";

interface OptionsPageProps {
  firstFolderId: string;
}

const OptionsPage: React.FC<OptionsPageProps> = ({ firstFolderId }) => {
  const { type, id } = useParams<Params>();
  const { getAsset, folders, binders, studyPacks } = useContext(
    FileTreeContext
  );
  const history = useHistory();
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
  const foldersExist = type === FILETREE_TYPES.FOLDER && !isEmpty(folders);
  const bindersExist = type === FILETREE_TYPES.BINDER && !isEmpty(binders);
  const studyPacksExist =
    type === FILETREE_TYPES.STUDY_SET && !isEmpty(studyPacks);

  // if id doesn't exist, just push to first folder
  useMemo(() => {
    if (
      firstFolderId &&
      (foldersExist || bindersExist || studyPacksExist) &&
      !getAsset(type, id)
    )
      history.push(firstFolderLink);
  }, [
    firstFolderId,
    foldersExist,
    bindersExist,
    studyPacksExist,
    getAsset,
    history,
    type,
    id,
    firstFolderLink,
  ]);

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
