import React from "react";
import styled from "styled-components";

const InsetPage: React.FC = ({ children }) => {
  return <StyledInsetPage>{children}</StyledInsetPage>;
};

const StyledInsetPage = styled.div`
  padding-left: calc(100px + env(safe-area-inset-left));
  padding-right: calc(100px + env(safe-area-inset-right));
  width: 100%;
  height: 100%;
  max-width: 1100px;
`;

export default InsetPage;
