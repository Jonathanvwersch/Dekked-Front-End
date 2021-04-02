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
}

const MainSettingsModal: React.FC<MainSettingsModalProps> = ({
  handleBlockClick,
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
              handleMouseDown={handleBlockClick(block.label)}
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
  width: 200px;
  user-select: none;
  height: 100%;
  max-height: 100%;
  border-right: ${({ theme }) => `1px solid ${theme.colors.grey3}`};
  background-color: ${({ theme }) => theme.colors.secondary};
`;
export default MainSettingsModal;
