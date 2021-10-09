import React from "react";
import { useHistory, useLocation, withRouter } from "react-router-dom";
import { useAtom } from "jotai";
import {
  bindersAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  studySetsAtom,
  userAtom,
} from "./store";

import { FullPageLoadingSpinner } from "dekked-design-system";
import { useQuery } from "react-query";
import { getFiles, getUser } from "./api";
import { uniqueApiKey } from "./helpers";
import { FILETREE_TYPES, UserType } from "./shared";
import PrivateRoute from "./Router/PrivateRoute";
import { OptionsPage } from "./pages";

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, setFileTree] = useAtom(fileTreeAtom);
  const [, setFolders] = useAtom(foldersAtom);
  const [, setBinders] = useAtom(bindersAtom);
  const [, setStudySets] = useAtom(studySetsAtom);
  const [, setUser] = useAtom(userAtom);
  const history = useHistory();
  const location = useLocation();

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
      location.pathname === "/" &&
        history.push(
          `/${FILETREE_TYPES.FOLDER}/${Object.keys(data?.fileTree)[0]}`
        );
    },
  });

  return (
    <>
      {isLoading ? (
        <FullPageLoadingSpinner />
      ) : (
        <PrivateRoute path="/:type/:id" component={OptionsPage} />
      )}
    </>
  );
};

export default withRouter(App);
