import React, { useEffect, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { Redirect, Route, withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { useQuery } from "react-query";
import { ErrorPage, LogInSignUpPage } from "./pages";
import { getSessionCookie } from "./helpers";
import CustomSwitch from "./Router/CustomSwitch";
import { theme } from "./styles/theme";
import { useAtom } from "jotai";
import { getBinders, getFileTree, getFolders, getStudySets } from "./services";
import { SkeletonTheme } from "react-loading-skeleton";
import {
  bindersAtom,
  darkModeAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  loadingErrorAtom,
  studySetsAtom,
  userAtom,
} from "./store";
import { getUser } from "./services/authentication/getUser";
import { UserType } from "./shared";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const [isDarkTheme] = useAtom(darkModeAtom);
  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [loadingError, setLoadingError] = useAtom(loadingErrorAtom);

  // get user on mount
  const { data: user } = useQuery<UserType>(
    `${getSessionCookie()}-user`,
    getUser,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled: Boolean(getSessionCookie()),
      retry: 5,
    }
  );

  // Fetch file tree data on mount
  const { data: initialFileTree, isFetched: isFetchedFileTree } =
    useQuery<FileTreeInterface>(
      `${getSessionCookie()}-file-tree`,
      getFileTree,
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: Boolean(getSessionCookie()),
        retry: 5,
      }
    );

  const { data: initialFolders, isFetched: isFetchedFolders } = useQuery<{
    [key: string]: FolderInterface;
  }>(`${getSessionCookie()}-folders`, () => getFolders(), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(getSessionCookie()),
    retry: 5,
  });

  const { data: initialBinders, isFetched: isFetchedBinders } = useQuery<{
    [key: string]: BinderInterface;
  }>(`${getSessionCookie()}-binders`, getBinders, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(getSessionCookie()),
    retry: 5,
  });

  const { data: initialStudySets, isFetched: isFetchedStudySets } = useQuery<{
    [key: string]: StudySetInterface;
  }>(`${getSessionCookie()}-study-sets`, getStudySets, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(getSessionCookie()),
    retry: 5,
  });

  const [, _setFileTree] = useAtom(fileTreeAtom);
  const [, _setFolders] = useAtom(foldersAtom);
  const [, _setBinders] = useAtom(bindersAtom);
  const [, _setStudySets] = useAtom(studySetsAtom);
  const [, _setUser] = useAtom(userAtom);

  useEffect(() => {
    if (
      initialFileTree === null ||
      initialStudySets === null ||
      initialFolders === null ||
      initialBinders === null
    ) {
      setLoadingError(true);
    }
  }, [
    initialFileTree,
    initialFolders,
    initialStudySets,
    initialBinders,
    setLoadingError,
    loadingError,
  ]);

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

  // Set global state variables on mount
  useEffect(() => {
    _setFileTree(initialFileTree);
    _setFolders(initialFolders);
    _setBinders(initialBinders);
    _setStudySets(initialStudySets);
  }, [
    initialFileTree,
    initialFolders,
    initialBinders,
    initialStudySets,
    _setBinders,
    _setFolders,
    _setStudySets,
    _setFileTree,
  ]);

  useEffect(() => {
    if (user) _setUser(user);
  }, [user, _setUser]);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  const memoisedTheme = useMemo(() => theme(isDarkTheme), [isDarkTheme]);

  return (
    <ThemeProvider theme={memoisedTheme}>
      <SkeletonTheme color={memoisedTheme.colors.loadingBlocks}>
        <StyledApp className="app">
          <GlobalStyle />
          {!loadingError ? (
            <CustomSwitch>
              <Route
                exact
                path="/login"
                render={() => <LogInSignUpPage login />}
              >
                {getSessionCookie() && <Redirect to="/" />}
              </Route>
              <Route exact path="/sign-up" component={LogInSignUpPage}>
                {getSessionCookie() && <Redirect to="/" />}
              </Route>
              <Routes />
            </CustomSwitch>
          ) : (
            <ErrorPage />
          )}
        </StyledApp>
      </SkeletonTheme>
    </ThemeProvider>
  );
};

export default withRouter(App);

const StyledApp = styled.div`
  width: 100vw;
  position: relative;
  height: 100vh;
  flex: 1 1 0%;
  display: flex;
  overflow-x: hidden;
`;
