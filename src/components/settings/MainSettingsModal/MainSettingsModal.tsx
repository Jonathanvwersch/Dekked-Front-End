import React, { useState } from "react";
import { SettingsOptions, SettingsSidebar } from "..";
import { MODAL_TYPE, SIZES } from "../../../shared";
import { theme } from "../../../styles/theme";
import { Flex, Overlay, ShadowCard } from "../../common";
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
      isOpen={openModal}
      handleClose={handleCloseModal}
      close
      center
      type={MODAL_TYPE.MODAL_LIGHTBOX}
    >
      <ShadowCard
        height="800px"
        width="1000px"
        borderRadius={theme.sizes.borderRadius[SIZES.LARGE]}
      >
        <Flex height="100%">
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
        </Flex>
      </ShadowCard>
    </Overlay>
  );
};

export default MainSettingsModal;
