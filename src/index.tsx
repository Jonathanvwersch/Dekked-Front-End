import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider, LOCALES } from "./intl";
import { UserContextProvider } from "./contexts/UserContext";
import { DarkThemeContextProvider } from "./contexts/DarkThemeContext";

ReactDOM.render(
  <IntlProvider locale={LOCALES.ENGLISH_GB}>
    <Router>
      <UserContextProvider>
        <DarkThemeContextProvider>
          <App />
        </DarkThemeContextProvider>
      </UserContextProvider>
    </Router>
  </IntlProvider>,
  document.getElementById("dekked-app")
);
