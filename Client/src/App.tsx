import React from "react";
import {
  ComponentLoadingSpinner,
  FullPageLoadingSpinner,
} from "./Components/Common/LoadingSpinner/LoadingSpinner";

export const App: React.FC = () => {
  return (
    <div className="app">
      <FullPageLoadingSpinner />
      <ComponentLoadingSpinner />
    </div>
  );
};

export default App;
