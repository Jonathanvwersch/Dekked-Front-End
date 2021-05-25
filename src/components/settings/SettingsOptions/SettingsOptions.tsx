import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { SettingsAccount } from "..";
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
        <Box px={theme.spacers.size64} pt={theme.spacers.size32}>
          {activeSetting === SETTINGS_SIDEBAR_DATA.ACCOUNT ? (
            <SettingsAccount />
          ) : null}
        </Box>
      </Scroller>
      <Footer
        padding={`${theme.spacers.size16} ${theme.spacers.size64}`}
        handleCancel={handleCloseModal}
        mainButtonText={"generics.saveChanges"}
        alignment="flex-start"
        divider={true}
      />
    </>
  );
};

export default SettingsOptions;
