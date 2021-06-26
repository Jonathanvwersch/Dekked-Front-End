import { useAtom } from "jotai";
import { first } from "lodash";
import React, { useLayoutEffect } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { getSessionCookie, useAsset } from "../helpers";
import { FILETREE_TYPES } from "../shared";
import { fileTreeAtom, firstFolderIdAtom, loadingErrorAtom } from "../store";

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
  const [firstFolderId] = useAtom(firstFolderIdAtom);
  const [loadingError] = useAtom(loadingErrorAtom);
  const { addAsset } = useAsset();
  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useLayoutEffect(() => {
    if (loadingError) {
      history.push("/error");
    } else if (!getSessionCookie()) {
      history.push("/login");
    } else if (path === "/" && firstFolderId) {
      if (!firstFolderId) addAsset(FILETREE_TYPES.FOLDER);
      else history.push(`/${FILETREE_TYPES.FOLDER}/${firstFolderId}`);
    }
  }, [history, firstFolderId, path, loadingError, addAsset]);

  return (
    <>
      {!isLoading && getSessionCookie() ? (
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
