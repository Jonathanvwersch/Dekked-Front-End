import React, { useEffect, useMemo } from "react";
import styled, { ThemeProvider } from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { useAtom } from "jotai";
import { SkeletonTheme } from "react-loading-skeleton";
import { darkModeAtom } from "./store";

import { theme } from "dekked-design-system";
import { ErrorBoundaryFallback } from "./components/common";
import InnerApp from "./InnerApp";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const [isDarkTheme] = useAtom(darkModeAtom);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  const memoisedTheme = useMemo(() => theme(isDarkTheme), [isDarkTheme]);

  return (
    <ThemeProvider theme={memoisedTheme}>
      <SkeletonTheme color={memoisedTheme.colors.loadingBlocks}>
        <StyledApp className="app">
          <ErrorBoundaryFallback>
            <GlobalStyle />
            <InnerApp />
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
