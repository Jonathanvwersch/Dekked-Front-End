import React from "react";
import { useTheme } from "react-jss";
import { PlusIcon } from "../../assets";
import { ThemeType } from "../../theme";
import HorizontalFlexContainer from "../common/HorizontalFlexContainer/HorizontalFlexContainer";
import IconWrapper from "../common/IconWrapper/IconWrapper";
import Spacer from "../common/Spacer/Spacer";
import Text from "../common/Text/Text";
import VerticalFlexContainer from "../common/VerticalFlexContainer/VerticalFlexContainer";

interface SidebarWorkspaceProps {}

const SidebarWorkspace: React.FC<SidebarWorkspaceProps> = ({}) => {
  const theme: ThemeType = useTheme();

  return (
    <VerticalFlexContainer>
      <HorizontalFlexContainer padding="8px 16px">
        <Text fontColour={theme.colours.grey1}>Workspace</Text>
      </HorizontalFlexContainer>
      <VerticalFlexContainer overflow="auto"></VerticalFlexContainer>
    </VerticalFlexContainer>
  );
};

export default SidebarWorkspace;
