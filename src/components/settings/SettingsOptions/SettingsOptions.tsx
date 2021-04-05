import React, { useContext } from "react";
import { ThemeContext } from "styled-components/macro";
import { SettingsAccount } from "..";
import { ALIGNMENT } from "../../../shared";
import { Box, Footer, Scroller } from "../../common";
import { SETTINGS_SIDEBAR_DATA } from "../SettingsSidebar/SettingSidebar.data";

interface SettingsOptionsProps {
  activeSetting: SETTINGS_SIDEBAR_DATA;
  handleCloseModal: () => void;
}

const SettingsOptions: React.FC<SettingsOptionsProps> = ({
  activeSetting,
  handleCloseModal,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <Scroller height="100%">
        <Box p={theme.spacers.size64}>
          {activeSetting === SETTINGS_SIDEBAR_DATA.ACCOUNT ? (
            <SettingsAccount />
          ) : null}
        </Box>
      </Scroller>
      <Footer
        padding={`${theme.spacers.size16} ${theme.spacers.size64}`}
        handleCancel={handleCloseModal}
        mainButtonText={"generics.saveChanges"}
        alignment={ALIGNMENT.LEFT}
      />
    </>
  );
};

export default SettingsOptions;
