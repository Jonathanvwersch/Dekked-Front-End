import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { Redirect, Route, withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { useQuery } from "react-query";
import { LogInSignUpPage } from "./pages";
import { getSessionCookie } from "./helpers";
import CustomSwitch from "./Router/CustomSwitch";
import { theme } from "./styles/theme";
import { useAtom } from "jotai";
import { getBinders, getFileTree, getFolders, getStudySets } from "./services";
import {
  bindersAtom,
  darkModeAtom,
  fileTreeAtom,
  foldersAtom,
  studySetsAtom,
  userAtom,
} from "./store";
import { getUser } from "./services/authentication/getUser";
import { UserType } from "./shared";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const [isDarkTheme] = useAtom(darkModeAtom);
  const color = theme(isDarkTheme).colors.primary;
  const name = "";

  // Fetch file tree data on mount
  const { data: initialFileTree } = useQuery<FileTreeInterface>(
    "file-tree",
    getFileTree,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const { data: initialFolders } = useQuery<{ [key: string]: FolderInterface }>(
    "folders",
    () => getFolders({ name, color }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const { data: initialBinders } = useQuery<{ [key: string]: BinderInterface }>(
    "binders",
    getBinders,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    }
  );

  const { data: initialStudySets } = useQuery<{
    [key: string]: StudyPackInterface;
  }>("study-sets", getStudySets, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  // get user on mount
  const { data: user } = useQuery<UserType>("user", getUser, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const [, _setFileTree] = useAtom(fileTreeAtom);
  const [, _setFolders] = useAtom(foldersAtom);
  const [, _setBinders] = useAtom(bindersAtom);
  const [, _setStudySets] = useAtom(studySetsAtom);
  const [, _setUser] = useAtom(userAtom);

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
    if (!user) _setUser(user);
  }, [user, _setUser]);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider theme={theme(isDarkTheme)}>
      <StyledApp className="app">
        <GlobalStyle />
        <CustomSwitch>
          <Route exact path="/login" render={() => <LogInSignUpPage login />}>
            {getSessionCookie() && <Redirect to="/" />}
          </Route>
          <Route exact path="/sign-up" component={LogInSignUpPage}>
            {getSessionCookie() && <Redirect to="/" />}
          </Route>
          <Routes />
        </CustomSwitch>
      </StyledApp>
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
