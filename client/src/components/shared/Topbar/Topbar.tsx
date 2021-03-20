import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { HamburgerMenuIcon } from "../../../assets";
import { SidebarContext } from "../../../contexts";
import { IconActive, Spacer } from "../../common";
import { SIZES } from "../../common/Pages/InsetPage";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);

  return (
    <StyledTopbar>
      {!sidebar ? (
        <>
          <IconActive handleClick={handleSidebar}>
            <HamburgerMenuIcon size={SIZES.LARGE} />
          </IconActive>
          <Spacer width="16px" />
        </>
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
  padding: 16px 32px;
`;

export default TopBar;
