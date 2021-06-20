import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { getSessionCookie } from "../helpers";
import { FILETREE_TYPES } from "../shared";
import { fileTreeAtom, loadingErrorAtom } from "../store";

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
  const [loadingError] = useAtom(loadingErrorAtom);

  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useEffect(() => {
    if (loadingError) {
      history.push("/error");
    } else if (!getSessionCookie()) {
      history.push("/login");
    } else if (path === "/" && fileTree && Object.keys(fileTree)[0]) {
      history.push(`/${FILETREE_TYPES.FOLDER}/${Object.keys(fileTree)[0]}`);
    }
  }, [history, fileTree, path, loadingError]);

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
