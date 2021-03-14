import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SidebarContext } from "../../../contexts";
import { ComponentLoadingSpinner, Divider } from "../../common";
import Base from "./Base/Base";
import Top from "./Top/Top";
import Workspace from "./Workspace/Workspace";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [loading, setLoading] = useState(true);
  const { sidebar } = useContext(SidebarContext);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  return sidebar ? (
    <StyledSidebar>
      {!loading ? (
        <>
          <Top />
          <Divider />
          <Workspace />
          <Base />
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
  height: 100%;
  max-height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

export default Sidebar;
