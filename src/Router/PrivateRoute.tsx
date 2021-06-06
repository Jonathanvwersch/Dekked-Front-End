import React, { useContext, useLayoutEffect, useState } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { FileTreeContext } from "../contexts";
import { getSessionCookie } from "../helpers";
import { FILETREE_TYPES } from "../shared";

type PrivateRouteProps = {
  path: string | string[];
  exact?: boolean;
  strict?: boolean;
  component?: any;
  children?: any;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  exact = false,
  strict = false,
  component: Component,
  children,
}) => {
  const history = useHistory();
  const { addAsset, isTreeEmpty, isLoading, fileTree } =
    useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getSessionCookie());

  // If file tree is empty, auto add 1 folder
  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useLayoutEffect(() => {
    if (isTreeEmpty) {
      addAsset(FILETREE_TYPES.FOLDER);
    }
    if (!isLoggedIn) {
      history.push("/login");
    } else if (path === "/" && firstFolderId) {
      history.push(firstFolderLink);
    }
    setIsLoggedIn(getSessionCookie());
  }, [
    history,
    firstFolderLink,
    path,
    isLoggedIn,
    firstFolderId,
    isTreeEmpty,
    addAsset,
  ]);

  return (
    <>
      {!isLoading && isLoggedIn ? (
        <Route path={path} exact={exact} strict={strict} component={Component}>
          {children}
        </Route>
      ) : (
        <FullPageLoadingSpinner />
      )}
    </>
  );
};

export default PrivateRoute;
