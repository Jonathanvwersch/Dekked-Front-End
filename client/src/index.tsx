import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { SidebarContextProvider } from "./contexts/SidebarContext";
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./styles/theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <FileTreeContextProvider>
      <SidebarContextProvider>
        <Router>
          <App />
        </Router>
      </SidebarContextProvider>
    </FileTreeContextProvider>
  </ThemeProvider>,
  document.getElementById("dekked-app")
);
