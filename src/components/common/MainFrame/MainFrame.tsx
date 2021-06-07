// The main frame is a wrapper component around the topbar and the page
import React, { useContext } from "react";
import styled from "styled-components";
import { ComponentLoadingSpinner, Page } from "..";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import TopBar from "../../shared/Topbar/Topbar";

interface MainFrameProps {
  backgroundColor?: string;
}

const MainFrame: React.FC<MainFrameProps> = ({ children, backgroundColor }) => {
  const { loading } = useContext(SelectedItemContext);

  return (
    <>
      <StyledMainFrame backgroundColor={backgroundColor}>
        {!loading ? (
          <>
            <TopBar />
            {<Page>{children}</Page>}
          </>
        ) : (
          <ComponentLoadingSpinner />
        )}
      </StyledMainFrame>
    </>
  );
};

export const StyledMainFrame = styled.div<MainFrameProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : theme.colors.backgrounds.pageBackground};
  height: 100%;
  max-height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  width: 0px;
`;

export default MainFrame;
