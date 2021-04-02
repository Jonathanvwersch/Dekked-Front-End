// The main frame is a wrapper component around the topbar and the page
import React, { useContext } from "react";
import styled from "styled-components";
import { ComponentLoadingSpinner, Page } from "..";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import TopBar from "../../shared/Topbar/Topbar";

const MainFrame: React.FC = ({ children }) => {
  const { loading } = useContext(SelectedItemContext);

  return (
    <>
      {!loading ? (
        <StyledMainFrame>
          <TopBar />
          <Page>{children}</Page>
        </StyledMainFrame>
      ) : (
        <ComponentLoadingSpinner />
      )}
    </>
  );
};

export const StyledMainFrame = styled.div`
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
