import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { FileTreeContextProvider } from "./services/file-structure/FileTreeContext";
export const App: React.FC = () => {
  return (
    <FileTreeContextProvider>
      <div className="app">
        <Sidebar />
      </div>
    </FileTreeContextProvider>
  );
};

export default App;
