import React, { useEffect } from "react";
import styled from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { Route, Switch, withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogInSignUpPage, LogOutPage } from "./pages";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const queryClient = new QueryClient();

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StyledApp className="app">
        <GlobalStyle />
        <Switch>
          <Route path="/login" render={() => <LogInSignUpPage login />} />
          <Route path="/sign-up" component={LogInSignUpPage} />
          <Route path="/logout" component={LogOutPage} />
          <FileTreeContextProvider>
            <Routes />
          </FileTreeContextProvider>
        </Switch>
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
