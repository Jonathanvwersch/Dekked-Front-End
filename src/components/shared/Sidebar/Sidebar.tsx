import { useAtom } from "jotai";
import React, { useCallback, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { SidebarHome, SidebarTop, SidebarWorkspace } from ".";
import { useOutsideClickListener, useResponsiveLayout } from "../../../hooks";
import { LAYOUT_VERTICAL } from "../../../hooks/useResponsiveLayout";
import { SIZES } from "../../../shared";
import { sidebarAtom } from "../../../store";
import SidebarBase from "./SidebarBase/SidebarBase";
import SidebarWorkspaceHeader from "./SidebarWorkspace/SidebarWorkspaceHeader";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const [hoverbar, setHoverbar] = useState<boolean>(false);
  const bottomFolderRef = useRef<HTMLDivElement>(null);
  const layout = useResponsiveLayout();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = layout === LAYOUT_VERTICAL && sidebar;
  useOutsideClickListener(sidebarRef, () => setSidebar(false), isMobile);

  const mouseLeave = useCallback(() => {
    !sidebar && setHoverbar(false);
  }, [sidebar]);

  const mouseEnter = useCallback(() => {
    !sidebar && setHoverbar(true);
  }, [sidebar]);

  return (
    <SidebarContainer
      ref={sidebarRef}
      sidebar={sidebar}
      style={{
        position: isMobile ? "fixed" : "unset",
      }}
    >
      <InnerSidebar
        sidebar={sidebar}
        hoverbar={hoverbar}
        onMouseLeave={
          !sidebar
            ? mouseLeave
            : () => {
                return null;
              }
        }
        onMouseEnter={
          !sidebar
            ? mouseEnter
            : () => {
                return null;
              }
        }
      >
        <>
          <SidebarTop />
          <SidebarHome />
          <SidebarWorkspaceHeader />
          <SidebarWorkspace bottomFolderRef={bottomFolderRef} />
          <SidebarBase bottomFolderRef={bottomFolderRef} />
        </>
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
  max-width: ${({ theme, sidebar }) => (sidebar ? theme.sizes.sidebar : "0px")};
  height: 100%;
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
  min-width: ${({ theme }) => theme.sizes.sidebar};
  pointer-events: auto;
  z-index: 10;
  height: 100%;
  max-height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  opacity: 1;
`;

const sidebarHidden = css<{ hoverbar: boolean }>`
  height: calc(100vh - 130px);
  min-width: ${({ theme }) => theme.sizes.sidebar};
  box-shadow: ${({ theme }) => theme.boxShadow};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.LARGE]};
  opacity: ${({ hoverbar }) => (hoverbar ? 1 : 0)};
  transform: ${({ hoverbar, theme }) =>
    hoverbar
      ? "translateX(0px) translateZ(0px)"
      : `translateX(calc(20px - ${theme.sizes.sidebar})) translateZ(0px)`};
`;

export default React.memo(Sidebar);
