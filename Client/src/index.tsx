import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "react-jss";
import { theme } from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
