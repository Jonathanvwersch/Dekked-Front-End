import React from "react";
import Avatar from "./Components/Common/Avatar/Avatar";
import {
  ComponentLoadingSpinner,
  FullPageLoadingSpinner,
} from "./Components/Common/LoadingSpinner/LoadingSpinner";
import Spacer from "./Components/Common/Spacer/Spacer";
import VerticalFlexContainer from "./Components/Common/VerticalFlexContainer/VerticalFlexContainer";

export const App: React.FC = () => {
  return (
    <div className="app">
      <VerticalFlexContainer>
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <ComponentLoadingSpinner />
        <Avatar>J</Avatar>
      </VerticalFlexContainer>
    </div>
  );
};

export default App;
