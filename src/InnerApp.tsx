import React, { useEffect } from "react";
import Routes from "./Router/Routes";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-query";
import { uniqueApiKey } from "./helpers";
import CustomSwitch from "./Router/CustomSwitch";
import { useAtom } from "jotai";
import { getBinders, getFileTree, getFolders, getStudySets } from "./api";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  studySetsAtom,
  userAtom,
} from "./store";
import { getUser } from "./api";
import { UserType } from "./shared";

export const App: React.FC = () => {
  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, _setFileTree] = useAtom(fileTreeAtom);
  const [, _setFolders] = useAtom(foldersAtom);
  const [, _setBinders] = useAtom(bindersAtom);
  const [, _setStudySets] = useAtom(studySetsAtom);
  const [, _setUser] = useAtom(userAtom);

  useQuery<UserType>(uniqueApiKey("user"), getUser, {
    onSuccess: (data) => _setUser(data),
  });

  const { isFetched: isFetchedFileTree } = useQuery<FileTreeInterface>(
    uniqueApiKey("file-tree"),
    getFileTree,
    {
      onSuccess: (data) => _setFileTree(data),
    }
  );

  const { isFetched: isFetchedFolders } = useQuery<{
    [key: string]: FolderInterface;
  }>(uniqueApiKey("folders"), getFolders, {
    onSuccess: (data) => _setFolders(data),
  });

  const { isFetched: isFetchedBinders } = useQuery<{
    [key: string]: BinderInterface;
  }>(uniqueApiKey("binders"), getBinders, {
    onSuccess: (data) => _setBinders(data),
  });

  const { isFetched: isFetchedStudySets } = useQuery<{
    [key: string]: StudySetInterface;
  }>(uniqueApiKey("study-sets"), getStudySets, {
    onSuccess: (data) => _setStudySets(data),
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
    <CustomSwitch>
      <Routes />
    </CustomSwitch>
  );
};

export default withRouter(App);
