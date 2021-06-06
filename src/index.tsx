import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/theme";
import { IntlProvider, LOCALES } from "./intl";
import { UserContextProvider } from "./contexts/UserContext";

ReactDOM.render(
  <ThemeProvider theme={theme()}>
    <IntlProvider locale={LOCALES.ENGLISH_GB}>
      <Router>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </Router>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById("dekked-app")
);
