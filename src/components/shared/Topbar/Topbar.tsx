import { useAtom } from "jotai";
import React, { useContext } from "react";

import styled, { ThemeContext } from "styled-components";
import { SIZES } from "../../../shared";
import { isAppLoadingAtom, sidebarAtom } from "../../../store";
import Skeleton from "react-loading-skeleton";

import {
  Flex,
  IconActive,
  Spacer,
  Tooltip,
  HamburgerMenuIcon,
} from "dekked-design-system";
import Breadcrumbs from "./Breadcrumbs";
import PageSaving from "./PageSaving";

const TopBar: React.FC = () => {
  const [sidebar, setSidebar] = useAtom(sidebarAtom);
  const theme = useContext(ThemeContext);
  const [isLoading] = useAtom(isAppLoadingAtom);

  return (
    <StyledTopbar>
      {!sidebar && !isLoading ? (
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
          <StyledSkeleton count={3} width="100px" height="20px" />
        )}
        <PageSaving />
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
  height: 58px;
  top: 0;
  user-select: none;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacers.size16}
    ${({ theme }) => theme.spacers.size32};
`;

export default React.memo(TopBar);
