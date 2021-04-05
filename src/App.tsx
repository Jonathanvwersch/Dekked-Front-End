import React from "react";
import styled from "styled-components";
import Routes from "./Router/Routes";
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
  display: flex;
  overflow: hidden;
`;
