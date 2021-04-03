import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { Block } from "../../common";
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
  const theme = useContext(ThemeContext);

  return (
    <StyledSidebar>
      <SidebarScroller heading="Settings">
        {SettingsSidebarData.map((block) => {
          return (
            <Block
              backgroundColor={theme.colors.secondary}
              icon={block.icon}
              label={block.label}
              handleClick={() => handleBlockClick(block.label)}
              fontWeight={
                activeSetting === block.label &&
                theme.typography.fontWeights.bold
              }
              className={activeSetting === block.label ? "active" : undefined}
            />
          );
        })}
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
