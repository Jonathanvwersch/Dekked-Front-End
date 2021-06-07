import React, { useContext, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { config } from "./config";
import Routes from "./Router/Routes";
import GlobalStyle from "./styles/GlobalStyles";
import { Redirect, Route, withRouter } from "react-router-dom";
import ReactGa from "react-ga";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogInSignUpPage, LogOutPage } from "./pages";
import { getSessionCookie } from "./helpers";
import CustomSwitch from "./Router/CustomSwitch";
import { theme } from "./styles/theme";
import { DarkThemeContext } from "./contexts";

export const App: React.FC = () => {
  ReactGa.initialize(config.GA_TRACKING_CODE);
  const queryClient = new QueryClient();
  const { isDarkTheme } = useContext(DarkThemeContext);

  // Google analytics user tracking
  useEffect(() => {
    ReactGa.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider theme={theme(isDarkTheme)}>
      <QueryClientProvider client={queryClient}>
        <StyledApp className="app">
          <GlobalStyle />
          <CustomSwitch>
            <Route exact path="/login" render={() => <LogInSignUpPage login />}>
              {getSessionCookie() && <Redirect to="/" />}
            </Route>
            <Route exact path="/sign-up" component={LogInSignUpPage}>
              {getSessionCookie() && <Redirect to="/" />}
            </Route>
            <Route exact path="/logout" component={LogOutPage} />
            <FileTreeContextProvider>
              <Routes />
            </FileTreeContextProvider>
          </CustomSwitch>
        </StyledApp>
      </QueryClientProvider>
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
