import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components/macro";
import App from "./App";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { SidebarContextProvider } from "./contexts/SidebarContext";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/theme";
import { IntlProvider, LOCALES } from "./intl";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <IntlProvider locale={LOCALES.ENGLISH_GB}>
      <FileTreeContextProvider>
        <SidebarContextProvider>
          <Router>
            <App />
          </Router>
        </SidebarContextProvider>
      </FileTreeContextProvider>
    </IntlProvider>
  </ThemeProvider>,
  document.getElementById("dekked-app")
);
