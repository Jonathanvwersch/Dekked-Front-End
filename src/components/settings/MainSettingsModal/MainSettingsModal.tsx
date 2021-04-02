import React, { useState } from "react";
import styled from "styled-components";
import { SettingsOptions, SettingsSidebar } from "..";
import { Overlay } from "../../common";
import { StyledMainFrame } from "../../common/MainFrame/MainFrame";
import { MODAL_TYPE } from "../../common/Overlay/Overlay";
import { SETTINGS_SIDEBAR_DATA } from "../SettingsSidebar/SettingSidebar.data";

interface MainSettingsModalProps {
  openModal: boolean;
  handleCloseModal: () => void;
}

const MainSettingsModal: React.FC<MainSettingsModalProps> = ({
  openModal,
  handleCloseModal,
}) => {
  const [activeSetting, setActiveSetting] = useState<SETTINGS_SIDEBAR_DATA>(
    SETTINGS_SIDEBAR_DATA.ACCOUNT
  );

  const handleActiveSetting = (activeSetting: SETTINGS_SIDEBAR_DATA) => {
    setActiveSetting(activeSetting);
  };

  return (
    <Overlay
      state={openModal}
      handleState={handleCloseModal}
      close
      center
      type={MODAL_TYPE.MODAL_LIGHTBOX}
    >
      <FullPageModal>
        <SettingsSidebar handleBlockClick={handleActiveSetting} />
        <StyledMainFrame>
          <SettingsOptions activeSetting={activeSetting} />
        </StyledMainFrame>
      </FullPageModal>
    </Overlay>
  );
};

const FullPageModal = styled.div`
  background: ${({ theme }) => theme.colors.backgrounds.pageBackground};
  display: flex;
  width: 1000px;
  height: 800px;
`;

export default MainSettingsModal;
