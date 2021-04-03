import React, { useState } from "react";
import { SettingsOptions, SettingsSidebar } from "..";
import { MODAL_TYPE } from "../../../shared";
import { HFlex, Overlay, ShadowCard } from "../../common";
import { StyledMainFrame } from "../../common/MainFrame/MainFrame";
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
      <ShadowCard height="800px" width="1000px">
        <HFlex height="100%">
          <SettingsSidebar
            activeSetting={activeSetting}
            handleBlockClick={handleActiveSetting}
          />
          <StyledMainFrame>
            <SettingsOptions
              handleCloseModal={handleCloseModal}
              activeSetting={activeSetting}
            />
          </StyledMainFrame>
        </HFlex>
      </ShadowCard>
    </Overlay>
  );
};

export default MainSettingsModal;
