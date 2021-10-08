import React, { useEffect, useLayoutEffect } from "react";
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
import {
  differenceInObjects,
  getSessionCookie,
  uniqueApiKey,
} from "../../helpers";
import { isEmpty } from "lodash";
import { useQuery } from "react-query";
import {
  getBinders,
  getFileTree,
  getFolders,
  getStudySets,
  getUser,
} from "../../api";

const OptionsPage: React.FC = () => {
  const { type } = useParams<Params>();
  const [, setType] = useAtom(typeAtom);

  useLayoutEffect(() => {
    setType(type);
  }, [type, setType]);

  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, _setFileTree] = useAtom(fileTreeAtom);
  const [, _setFolders] = useAtom(foldersAtom);
  const [, _setBinders] = useAtom(bindersAtom);
  const [, _setStudySets] = useAtom(studySetsAtom);
  const [, _setUser] = useAtom(userAtom);

  useQuery<UserType>(uniqueApiKey("user"), getUser, {
    onSuccess: (data) => _setUser(data),
    enabled: Boolean(getSessionCookie()),
  });

  const { isFetched: isFetchedFileTree } = useQuery<FileTreeInterface>(
    uniqueApiKey("file-tree"),
    getFileTree,
    {
      onSuccess: (data) => _setFileTree(data),
      enabled: Boolean(getSessionCookie()),
    }
  );

  const { isFetched: isFetchedFolders } = useQuery<{
    [key: string]: FolderInterface;
  }>(uniqueApiKey("folders"), getFolders, {
    onSuccess: (data) => _setFolders(data),
    enabled: Boolean(getSessionCookie()),
  });

  const { isFetched: isFetchedBinders } = useQuery<{
    [key: string]: BinderInterface;
  }>(uniqueApiKey("binders"), getBinders, {
    onSuccess: (data) => _setBinders(data),
    enabled: Boolean(getSessionCookie()),
  });

  const { isFetched: isFetchedStudySets } = useQuery<{
    [key: string]: StudySetInterface;
  }>(uniqueApiKey("study-sets"), getStudySets, {
    onSuccess: (data) => _setStudySets(data),
    enabled: Boolean(getSessionCookie()),
  });

  useEffect(() => {
    if (
      isFetchedFileTree &&
      isFetchedFolders &&
      isFetchedStudySets &&
      isFetchedBinders
    ) {
      setIsLoading(false);
    }
  }, [
    isFetchedBinders,
    isFetchedFileTree,
    isFetchedFolders,
    isFetchedStudySets,
    setIsLoading,
  ]);

  return (
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
  );
};

export default React.memo(OptionsPage, (prevProps, newProps) => {
  return isEmpty(differenceInObjects(newProps, prevProps));
});
