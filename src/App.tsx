import React, { useEffect, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { useAtom } from "jotai";
import { SkeletonTheme } from "react-loading-skeleton";
import {
  bindersAtom,
  darkModeAtom,
  fileTreeAtom,
  foldersAtom,
  isAppLoadingAtom,
  studySetsAtom,
  userAtom,
} from "./store";

import { theme } from "dekked-design-system";
import { ErrorBoundaryFallback } from "./components/common";
import CustomSwitch from "./Router/CustomSwitch";
import { useQuery } from "react-query";
import { getFiles, getUser } from "./api";
import { getSessionCookie, uniqueApiKey } from "./helpers";
import { UserType } from "./shared";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const [isDarkTheme] = useAtom(darkModeAtom);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  const memoisedTheme = useMemo(() => theme(isDarkTheme), [isDarkTheme]);

  const [, setIsLoading] = useAtom(isAppLoadingAtom);
  const [, setFileTree] = useAtom(fileTreeAtom);
  const [, setFolders] = useAtom(foldersAtom);
  const [, setBinders] = useAtom(bindersAtom);
  const [, setStudySets] = useAtom(studySetsAtom);
  const [, setUser] = useAtom(userAtom);

  useQuery<UserType>(uniqueApiKey("user"), getUser, {
    onSuccess: (data) => setUser(data),
    enabled: Boolean(getSessionCookie()),
  });

  useQuery<LoadFilesInterface>(uniqueApiKey("files"), getFiles, {
    onSuccess: (data) => {
      setFolders(data?.folders);
      setFileTree(data?.fileTree);
      setStudySets(data?.studySets);
      setBinders(data?.binders);
      setIsLoading(false);
    },
    enabled: Boolean(getSessionCookie()),
  });

  return (
    <ThemeProvider theme={memoisedTheme}>
      <SkeletonTheme color={memoisedTheme.colors.loadingBlocks}>
        <StyledApp className="app">
          <ErrorBoundaryFallback>
            <GlobalStyle />
            <CustomSwitch>
              <Routes />
            </CustomSwitch>
          </ErrorBoundaryFallback>
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
