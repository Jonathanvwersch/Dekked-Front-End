import { Block } from "dekked-design-system";
import React from "react";
import styled from "styled-components";
import { usePageSetupHelpers } from "../../../hooks";
import SidebarScroller from "../../shared/Sidebar/SidebarScroller/SidebarScroller";
import {
  SettingsSidebarData,
  SETTINGS_SIDEBAR_DATA,
} from "./SettingSidebar.data";

interface MainSettingsModalProps {
  handleBlockClick: (activeSetting: SETTINGS_SIDEBAR_DATA) => any;
  activeSetting: SETTINGS_SIDEBAR_DATA;
}

const MainSettingsModal: React.FC<MainSettingsModalProps> = ({
  handleBlockClick,
  activeSetting,
}) => {
  const { theme, formatMessage } = usePageSetupHelpers();

  return (
    <StyledSidebar>
      <SidebarScroller
        heading={formatMessage("sidebar.settingsModal.settings")}
      >
        {SettingsSidebarData.map((block) => (
          <Block
            key={block.value}
            backgroundColor={theme.colors.secondary}
            icon={block.icon}
            label={block.label}
            handleClick={() => handleBlockClick(block.value)}
            fontWeight={
              activeSetting === block.value
                ? theme.typography.fontWeights.bold
                : theme.typography.fontWeights.normal
            }
            className={activeSetting === block.value ? "active" : undefined}
          />
        ))}
      </SidebarScroller>
    </StyledSidebar>
  );
};

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  user-select: none;
  height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export default MainSettingsModal;
