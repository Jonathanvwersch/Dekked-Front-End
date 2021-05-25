import React, { useEffect } from "react";
import styled from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StyledApp className="app">
        <GlobalStyle />
        <Routes />
      </StyledApp>
    </QueryClientProvider>
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
