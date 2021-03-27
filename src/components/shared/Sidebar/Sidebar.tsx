import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { SidebarContext } from "../../../contexts";
import { SelectedItemContext } from "../../../contexts/SelectedItemContext";
import { ComponentLoadingSpinner } from "../../common";
import SidebarBase from "./SidebarBase/SidebarBase";
import SidebarTop from "./SidebarTop/SidebarTop";
import SidebarWorkspace from "./SidebarWorkspace/SidebarWorkspace";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { sidebar } = useContext(SidebarContext);
  const { loading } = useContext(SelectedItemContext);
  const bottomFolderRef = useRef<HTMLDivElement>(null);

  // scroll down to bottom of list as you add elements
  const scrollToBottom = () => {
    if (bottomFolderRef && bottomFolderRef.current) {
      bottomFolderRef?.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return sidebar ? (
    <StyledSidebar>
      {!loading ? (
        <>
          <SidebarTop />
          <SidebarWorkspace bottomFolderRef={bottomFolderRef} />
          <SidebarBase scrollToBottom={scrollToBottom} />
        </>
      ) : (
        <ComponentLoadingSpinner />
      )}
    </StyledSidebar>
  ) : null;
};

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  user-select: none;
  z-index: 10;
  position: relative;
  top: 0px;
  left: 0px;
  bottom: 0px;
  height: 100vh;
  max-height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default Sidebar;
