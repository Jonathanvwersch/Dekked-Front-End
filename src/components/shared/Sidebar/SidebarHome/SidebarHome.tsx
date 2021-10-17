import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { Flex, Spacer, Text, HomeIcon } from "dekked-design-system";
import { ThemeContext } from "styled-components";
import { useAtom } from "jotai";
import { isAppLoadingAtom } from "../../../../store";
import Skeleton from "react-loading-skeleton";
import {
  navLinkActiveStyle,
  navLinkStyle,
  StyledBlock,
} from "../SidebarBlock/SidebarBlock";
import { NavLink } from "react-router-dom";

interface SidebarHomeProps {}

const SidebarHome: React.FC<SidebarHomeProps> = () => {
  const theme = useContext(ThemeContext);
  const [isLoading] = useAtom(isAppLoadingAtom);

  return (
    <>
      {!isLoading ? (
        <NavLink
          to={"/"}
          exact
          style={navLinkStyle}
          activeStyle={navLinkActiveStyle(theme)}
        >
          <StyledBlock paddingLeft={theme.spacers.size16}>
            <Flex alignItems="center">
              <HomeIcon />
              <Spacer width={theme.spacers.size8} />
              <Text fontSize={theme.typography.fontSizes.size14}>
                <FormattedMessage id="sidebar.workspace.home" />
              </Text>
            </Flex>
          </StyledBlock>
        </NavLink>
      ) : (
        <Skeleton width="100px" />
      )}
    </>
  );
};

export default React.memo(SidebarHome);
