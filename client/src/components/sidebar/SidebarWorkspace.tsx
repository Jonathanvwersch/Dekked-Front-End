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
    <VerticalFlexContainer overflow="hidden auto">
      <HorizontalFlexContainer padding="8px 16px">
        <Text fontcolor={theme.colors.grey1}>Workspace</Text>
      </HorizontalFlexContainer>
      <VerticalFlexContainer overflow="hidden auto">
        <SidebarBlock />
      </VerticalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default SidebarWorkspace;
