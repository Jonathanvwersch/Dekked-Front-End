import React, { useCallback, useContext, useEffect } from "react";
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

  // before checking if the id exists by using the getAsset function, we first need to make sure that
  // the file files (folders, binders, and study sets) have been successfully fetched
  const doFilesExist = useCallback(() => {
    if (type === FILETREE_TYPES.FOLDER) return !isEmpty(folders);
    else if (type === FILETREE_TYPES.BINDER)
      return !isEmpty(folders) && !isEmpty(binders);
    else return !isEmpty(folders) && !isEmpty(binders) && !isEmpty(studyPacks);
  }, [type, folders, binders, studyPacks]);

  // if id doesn't exist, just push to first folder
  useEffect(() => {
    if (firstFolderId && doFilesExist() && !getAsset(type, id))
      history.push(firstFolderLink);
  }, [
    firstFolderId,
    doFilesExist,
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
