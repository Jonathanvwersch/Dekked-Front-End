// The main frame is a wrapper component around the topbar and the page
import React from "react";
import styled from "styled-components";
import { Page } from "..";
import { FullPage } from "../../shared";
import TopBar from "../../shared/Topbar/Topbar";

interface MainFrameProps {
  backgroundColor?: string;
  justifyContent?: string;
}

const MainFrame: React.FC<MainFrameProps> = ({ children, backgroundColor }) => {
  return (
    <FullPage>
      <StyledMainFrame backgroundColor={backgroundColor}>
        <>
          <TopBar />
          <Page>{children}</Page>
        </>
      </StyledMainFrame>
      <input
        type="file"
        accept="image/gif,image/jpeg,image/png,image/x-png,image/bmp"
        id="ImageUpload"
        style={{
          opacity: "0",
          pointerEvents: "none",
          position: "fixed",
          left: "-1000",
          top: "-1000",
        }}
      />
    </FullPage>
  );
};

export const StyledMainFrame = styled.div<MainFrameProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
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
