import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { HamburgerMenuIcon } from "../../../assets";
import { EditorContext, SidebarContext } from "../../../contexts";
import { SIZES } from "../../../shared";
import {
  ComponentLoadingSpinner,
  HFlex,
  IconActive,
  Spacer,
  Tooltip,
} from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);
  const { saving } = useContext(EditorContext);

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
      <HFlex width="auto">
        <Breadcrumbs />
        {saving ? (
          <>
            <Spacer width={theme.spacers.size32} />
            <ComponentLoadingSpinner size={SIZES.MEDIUM} />
          </>
        ) : null}
      </HFlex>
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
