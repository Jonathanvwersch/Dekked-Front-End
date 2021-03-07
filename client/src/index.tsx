import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { SidebarContextProvider } from "./contexts/SidebarContext";
import { theme } from "./styles/theme";
import { BrowserRouter as Router } from "react-router-dom";

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
