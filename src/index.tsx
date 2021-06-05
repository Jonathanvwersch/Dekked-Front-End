import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/theme";
import { IntlProvider, LOCALES } from "./intl";
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider locale={LOCALES.ENGLISH_GB}>
      <Router>
        <AuthenticationContextProvider>
          <App />
        </AuthenticationContextProvider>
      </Router>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById("dekked-app")
);
