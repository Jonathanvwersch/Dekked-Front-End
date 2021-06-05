import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/theme";
import { IntlProvider, LOCALES } from "./intl";
import { CookiesProvider } from "react-cookie";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider locale={LOCALES.ENGLISH_GB}>
      <Router>
        <CookiesProvider>
          <AuthenticationContextProvider>
            <App />
          </AuthenticationContextProvider>
        </CookiesProvider>
      </Router>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById("dekked-app")
);
