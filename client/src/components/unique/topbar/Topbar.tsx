import React, { useContext } from "react";
import styled from "styled-components";
import { HamburgerMenuIcon } from "../../../assets";
import { SidebarContext } from "../../../contexts";
import { IconActive } from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  return (
    <StyledTopbar>
      {!sidebar ? (
        <IconActive handleClick={handleSidebar}>
          <HamburgerMenuIcon size="24px" />
        </IconActive>
      ) : null}
      <Breadcrumbs />
    </StyledTopbar>
  );
};

const StyledTopbar = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  height: 65px;
  z-index: 998;
  position: sticky;
  top: 0;
  user-select: none;
  justify-content: flex-start;
  padding: 16px;
`;

export default TopBar;
