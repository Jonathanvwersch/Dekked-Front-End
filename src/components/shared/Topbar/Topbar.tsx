import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
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
  Text,
} from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const { sidebar, handleSidebar } = useContext(SidebarContext);
  const theme = useContext(ThemeContext);
  const { saving, saveError } = useContext(EditorContext);

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
        <HFlex>
          <Spacer width={theme.spacers.size32} />
          <Text
            fontColor={theme.colors.danger}
            fontSize={theme.typography.fontSizes.size14}
          >
            <FormattedMessage id="topbar.failedToSave" />
          </Text>
        </HFlex>
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
      <HFlex width="auto">
        <Breadcrumbs />
        {savingLoadingSpinner()}
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
