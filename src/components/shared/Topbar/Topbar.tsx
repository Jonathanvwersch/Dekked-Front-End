import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import styled, { ThemeContext } from "styled-components/macro";
import { HamburgerMenuIcon } from "../../../assets";
import { SavingEditorContext, SidebarContext } from "../../../contexts";
import { SIZES } from "../../../shared";
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
  const { saving, saveError } = useContext(SavingEditorContext);

  // Show a loading spinner when the notes page is auto saving
  // If the page fails to save, show a message saying Failed to save
  const savingLoadingSpinner = () => {
    if (saving && !saveError)
      return (
        <>
          <Spacer width={theme.spacers.size32} />
          <ComponentLoadingSpinner size={SIZES.MEDIUM} />
        </>
      );
    else if (saveError)
      return (
        <Flex>
          <Spacer width={theme.spacers.size32} />
          <Text
            fontColor={theme.colors.danger}
            fontSize={theme.typography.fontSizes.size14}
          >
            <FormattedMessage id="topbar.failedToSave" />
          </Text>
        </Flex>
      );
    else return null;
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
