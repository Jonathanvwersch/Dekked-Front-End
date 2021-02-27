import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FileTreeContextProvider } from "./contexts/FileTreeContext";
import { ThemeProvider } from "react-jss";
import { theme } from "./theme";
import { SidebarContextProvider } from "./contexts/SidebarContext";

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <FileTreeContextProvider>
        <SidebarContextProvider>
          <div className="app">
            <Sidebar />
          </div>
        </SidebarContextProvider>
      </FileTreeContextProvider>
    </ThemeProvider>
  );
};

export default App;
