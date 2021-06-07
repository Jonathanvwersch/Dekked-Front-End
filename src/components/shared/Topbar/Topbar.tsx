import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
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
  Text,
} from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);
  const { id, studyModes } = useParams<Params>();
  const isSaving = useIsMutating({ mutationKey: `${id}-save-notes` });

  // Show a loading spinner when the notes page is auto saving
  // If the page fails to save, show a message saying Failed to save
  const savingLoadingSpinner = () => {
    if (isSaving)
      return (
        <>
          <Spacer width={theme.spacers.size32} />
          <ComponentLoadingSpinner size={SIZES.SMALL} />
          {/* <Spacer width={theme.spacers.size4} />
          <Text fontColor={theme.colors.grey1}>
            <FormattedMessage id="generics.saving" />
            ...
          </Text> */}
        </>
      );

    return null;
  };

  return (
    <StyledTopbar>
      {!sidebar ? (
        <>
          <IconActive
            handleClick={handleSidebar}
            backgroundColor={
              studyModes && theme.colors.backgrounds.studyModeBackground
            }
          >
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
  z-index: 998;
  position: sticky;
  top: 0;
  user-select: none;
  justify-content: flex-start;
  padding: 16px 32px;
`;

export default TopBar;
