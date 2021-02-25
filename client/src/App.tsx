import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { ThemeProvider } from "react-jss";
import { theme } from "./theme";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FileTreeContextProvider>
        <div className="app">
          <Sidebar />
        </div>
      </FileTreeContextProvider>
    </ThemeProvider>
  );
};

export default App;
