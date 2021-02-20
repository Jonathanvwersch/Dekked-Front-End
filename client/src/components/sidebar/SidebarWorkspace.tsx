import React from "react";
import { useTheme } from "react-jss";
import { ThemeType } from "../../theme";
import {
  HorizontalFlexContainer,
  VerticalFlexContainer,
  Text,
} from "../common";

import SidebarBlock from "./SidebarBlock";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = () => {
  const theme: ThemeType = useTheme();

  return (
    <VerticalFlexContainer>
      <HorizontalFlexContainer padding="8px 16px">
        <Text fontColour={theme.colours.grey1}>Workspace</Text>
      </HorizontalFlexContainer>
      <VerticalFlexContainer overflow="hidden auto" height="calc(100% - 146px)">
        <SidebarBlock />
      </VerticalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default SidebarWorkspace;
