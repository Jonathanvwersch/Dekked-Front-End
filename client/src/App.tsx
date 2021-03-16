import React from "react";
import Routes from "./Routes";
import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";

export const App: React.FC = () => {
  return (
    <StyledApp className="app">
      <GlobalStyle />
      <Routes />
    </StyledApp>
  );
};

export default App;

const StyledApp = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
`;
