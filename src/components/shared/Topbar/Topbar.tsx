import React, { useContext } from "react";
import { useIsMutating } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { HamburgerMenuIcon } from "../../../assets";
import { SidebarContext } from "../../../contexts";
import { Params, SIZES } from "../../../shared";
import {
  ComponentLoadingSpinner,
  Flex,
  IconActive,
  Spacer,
  Tooltip,
} from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);
  const { id } = useParams<Params>();
  const isSaving = useIsMutating({ mutationKey: `${id}-save-notes` });

  // Show a loading spinner when the notes page is auto saving
  // If the page fails to save, show a message saying Failed to save
  const savingLoadingSpinner = () => {
    if (isSaving)
      return (
        <>
          <Spacer width={theme.spacers.size32} />
          <ComponentLoadingSpinner size={SIZES.MEDIUM} />
        </>
      );

    return null;
  };

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
      <Flex width="auto">
        <Breadcrumbs />
        {savingLoadingSpinner()}
      </Flex>
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
