import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { SettingsOptions, SettingsSidebar } from "..";
import { useStorageState } from "../../../hooks";
import { MODAL_TYPE, SIZES } from "../../../shared";
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
  const theme = useContext(ThemeContext);
  const { value: activeSetting, setValue: setActiveSetting } =
    useStorageState<SETTINGS_SIDEBAR_DATA>(
      SETTINGS_SIDEBAR_DATA.ACCOUNT,
      "settings"
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
      modalWidth="80%"
      modalHeight="800px"
    >
      <ShadowCard
        width="auto"
        height="100%"
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
