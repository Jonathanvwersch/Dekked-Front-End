import { useAtom } from "jotai";
import React, { useContext } from "react";
import { useIsMutating } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { HamburgerMenuIcon } from "../../../assets";
import { Params, SIZES } from "../../../shared";
import { isAppLoadingAtom, sidebarAtom } from "../../../store";
import Skeleton from "react-loading-skeleton";

import {
  ComponentLoadingSpinner,
  Flex,
  IconActive,
  Spacer,
  Tooltip,
} from "../../common";
import Breadcrumbs from "./Breadcrumbs";

const TopBar: React.FC = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const theme = useContext(ThemeContext);
  const { id } = useParams<Params>();
  const isSaving = useIsMutating({ mutationKey: `${id}-save-notes` });
  const [isLoading] = useAtom(isAppLoadingAtom);

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
          <IconActive handleClick={() => setSidebar((prevState) => !prevState)}>
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
      <Flex width="auto" justifyContent="center">
        {!isLoading ? (
          <Breadcrumbs />
        ) : (
          <StyledSkeleton count={3} width="50px" height="20px" />
        )}
        {savingLoadingSpinner()}
      </Flex>
    </StyledTopbar>
  );
};

const StyledSkeleton = styled(Skeleton)`
  margin-right: ${({ theme }) => theme.spacers.size8};
`;

const StyledTopbar = styled.div`
  display: flex;
  z-index: 998;
  position: sticky;
  min-height: 58px;
  top: 0;
  user-select: none;
  justify-content: flex-start;
  padding: 16px 32px;
`;

export default TopBar;
