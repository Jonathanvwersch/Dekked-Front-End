import { useAtom } from "jotai";
import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { getSessionCookie } from "../helpers";
import { FILETREE_TYPES } from "../shared";
import { fileTreeAtom } from "../store";

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
  const isLoading = false;
  const [fileTree] = useAtom(fileTreeAtom);
  const firstFolderId = fileTree ? Object.keys(fileTree)[0] : "/login";
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(getSessionCookie());

  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else if (path === "/" && firstFolderId) {
      history.push(firstFolderLink);
    }
  }, [history, firstFolderLink, path, isLoggedIn, firstFolderId]);

  useEffect(() => {
    setIsLoggedIn(getSessionCookie());
  }, []);

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
