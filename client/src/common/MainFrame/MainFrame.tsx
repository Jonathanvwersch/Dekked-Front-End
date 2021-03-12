import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ComponentLoadingSpinner, Page } from "..";
import TopBar from "../Topbar/Topbar";

const MainFrame: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return !loading ? (
    <StyledMainFrame>
      <TopBar />
      <Page>{children}</Page>
    </StyledMainFrame>
  ) : (
    <ComponentLoadingSpinner />
  );
};

const StyledMainFrame = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: 100%;
  max-height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  width: auto;
`;

export default MainFrame;
