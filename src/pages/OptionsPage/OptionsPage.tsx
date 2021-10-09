import React, { useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { BinderPage, FolderPage, StudyModePage, StudySetPage } from "..";
import { Sidebar } from "../../components/shared/Sidebar";
import { FILETREE_TYPES, Params, UserType } from "../../shared";
import CustomSwitch from "../../Router/CustomSwitch";
import PrivateRoute from "../../Router/PrivateRoute";
import { useAtom } from "jotai";

import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  studySetsAtom,
  typeAtom,
  userAtom,
} from "../../store";
import { uniqueApiKey } from "../../helpers";
import { useQuery } from "react-query";
import { getFiles, getUser } from "../../api";
import { FullPageLoadingSpinner } from "dekked-design-system";

const OptionsPage: React.FC = () => {
  const { type } = useParams<Params>();
  const [, setType] = useAtom(typeAtom);
  const [isLoading] = useAtom(isAppLoadingAtom);

  useLayoutEffect(() => {
    setType(type);
  }, [type, setType]);

  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, setFileTree] = useAtom(fileTreeAtom);
  const [, setFolders] = useAtom(foldersAtom);
  const [, setBinders] = useAtom(bindersAtom);
  const [, setStudySets] = useAtom(studySetsAtom);
  const [, setUser] = useAtom(userAtom);

  useQuery<UserType>(uniqueApiKey("user"), getUser, {
    onSuccess: (data) => setUser(data),
  });

  useQuery<LoadFilesInterface>(uniqueApiKey("files"), getFiles, {
    onSuccess: (data) => {
      setFolders(data?.folders);
      setFileTree(data?.fileTree);
      setStudySets(data?.studySets);
      setBinders(data?.binders);
      setIsLoading(false);
    },
  });

  return (
    <>
      {!isLoading ? (
        <>
          <Sidebar />
          <CustomSwitch>
            <PrivateRoute
              exact
              path={`/${FILETREE_TYPES.FOLDER}/:id`}
              component={FolderPage}
            />
            <PrivateRoute
              path={`/${FILETREE_TYPES.BINDER}/:id`}
              component={BinderPage}
            />
            <PrivateRoute
              exact
              path={`/${FILETREE_TYPES.STUDY_SET}/:id/:tab`}
              component={StudySetPage}
            />
            <PrivateRoute
              path={`/:type/:id/study/:studyModes`}
              component={StudyModePage}
            />
          </CustomSwitch>
        </>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default OptionsPage;
