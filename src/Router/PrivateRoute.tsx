import React, { useContext, useEffect, useState } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { UserContext, FileTreeContext } from "../contexts";
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
  const { user } = useContext(UserContext);
  const { fileTree } = useContext(FileTreeContext);
  const firstFolderId = Object.keys(fileTree)[0];
  const firstFolderLink = `/${FILETREE_TYPES.FOLDER}/${firstFolderId}`;
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    getSessionCookie(user.id)
  );

  // If there is no user, redirect to login
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    }
    if (path === "/") {
      history.push(firstFolderLink);
    }
    setIsLoggedIn(getSessionCookie());
  }, [history, user, firstFolderLink, path, isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
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
