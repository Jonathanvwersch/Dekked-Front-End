import React, { useContext, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";
import { SidebarBase, SidebarTop, SidebarWorkspace } from ".";
import { SidebarContext } from "../../../contexts";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { SIZES } from "../../../shared";
import { ComponentLoadingSpinner } from "../../common";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { sidebar } = useContext(SidebarContext);
  const [hoverbar, setHoverbar] = useState<boolean>(false);
  const { loading } = useContext(SelectedItemContext);
  const bottomFolderRef = useRef<HTMLDivElement>(null);

  // scroll down to bottom of list as you add elements
  const scrollToBottom = () => {
    if (bottomFolderRef && bottomFolderRef.current) {
      bottomFolderRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  console.log(hoverbar);

  return (
    <SidebarContainer sidebar={sidebar}>
      <InnerSidebar
        sidebar={sidebar}
        hoverbar={hoverbar}
        onMouseLeave={() => !sidebar && setHoverbar(false)}
        onMouseEnter={() => !sidebar && setHoverbar(true)}
      >
        {!loading ? (
          <>
            <SidebarTop />
            <SidebarWorkspace bottomFolderRef={bottomFolderRef} />
            <SidebarBase scrollToBottom={scrollToBottom} />
          </>
        ) : (
          <ComponentLoadingSpinner />
        )}
      </InnerSidebar>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div<{ sidebar: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1000;
  transition: box-shadow 300ms ease-in 0s;
  width: ${({ theme, sidebar }) => (sidebar ? theme.sizes.sidebar : 0)};
`;

const InnerSidebar = styled.div<{ sidebar: boolean; hoverbar: boolean }>`
  display: flex;
  flex-direction: column;
  top: 0px;
  left: 0px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.secondary};
  bottom: 0px;
  ${({ sidebar }) => (sidebar ? sidebarVisible : sidebarHidden)}
`;

const sidebarVisible = css`
  width: ${({ theme }) => theme.sizes.sidebar};
  pointer-events: auto;
  z-index: 10;
  height: 100%;
  max-height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  opacity: 1;
`;

const sidebarHidden = css<{ hoverbar: boolean }>`
  height: calc(100vh - 130px);
  width: ${({ theme }) => theme.sizes.sidebar};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.SMALL]};

  opacity: ${({ hoverbar }) => (hoverbar ? 1 : 0)};
  transform: ${({ hoverbar }) =>
    hoverbar
      ? "transform: translateX(0px) translateZ(0px);"
      : "translateX(-230px) translateZ(0px)"};
`;

export default React.memo(Sidebar);
