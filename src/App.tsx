import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { withRouter } from "react-router-dom";
import ReactGa from "react-ga";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  });

  return (
    <StyledApp className="app">
      <GlobalStyle />
      <Routes />
    </StyledApp>
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
