import { useAtom } from "jotai";
import React, { useLayoutEffect } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import { FullPageLoadingSpinner } from "../components/common";
import { getSessionCookie, useAddAsset } from "../helpers";
import { FILETREE_TYPES } from "../shared";
import { fileTreeAtom, isAppLoadingAtom, loadingErrorAtom } from "../store";

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
  const [isLoading, setIsLoading] = useAtom(isAppLoadingAtom);
  const [fileTree] = useAtom(fileTreeAtom);
  const [loadingError] = useAtom(loadingErrorAtom);
  const { addAsset } = useAddAsset();

  // If there is no user, redirect to login
  // If path === '/', redirect to first folder
  useLayoutEffect(() => {
    if (loadingError) {
      history.push("/error");
      setIsLoading(false);
    } else if (!getSessionCookie()) {
      history.push("/login");
    } else if (path === "/" && fileTree) {
      if (!Object.keys(fileTree)[0]) addAsset(FILETREE_TYPES.FOLDER);
      else
        history.push(`/${FILETREE_TYPES.FOLDER}/${Object.keys(fileTree)[0]}`);
    }
  }, [fileTree, loadingError]); // eslint-disable-line react-hooks/exhaustive-deps

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
