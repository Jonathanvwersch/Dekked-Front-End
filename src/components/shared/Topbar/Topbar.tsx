import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { HamburgerMenuIcon } from "../../../assets";
import { SidebarContext } from "../../../contexts";
import { SIZES } from "../../../shared";
import { IconActive, Spacer, Tooltip } from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);

  return (
    <StyledTopbar>
      {!sidebar ? (
        <>
          <IconActive handleClick={handleSidebar}>
            <Tooltip
              id="OpenSidebarHamburgerMenu"
              text="tooltips.sidebar.openSidebar"
            >
              <HamburgerMenuIcon size={SIZES.LARGE} />
            </Tooltip>
          </IconActive>
          <Spacer width={theme.spacers.size16} />
        </>
      ) : null}
      <Breadcrumbs />
    </StyledTopbar>
  );
};

const StyledTopbar = styled.div`
  display: flex;
  min-height: 65px;
  z-index: 998;
  position: sticky;
  top: 0;
  user-select: none;
  justify-content: flex-start;
  padding: 16px 32px;
`;

export default TopBar;
