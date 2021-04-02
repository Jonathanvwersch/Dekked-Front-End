import React from "react";
import { SettingsAccount } from "..";
import { SIZES } from "../../../shared";
import { InsetPage } from "../../common";
import { SETTINGS_SIDEBAR_DATA } from "../SettingsSidebar/SettingSidebar.data";

interface SettingsOptionsProps {
  activeSetting: SETTINGS_SIDEBAR_DATA;
}

const SettingsOptions: React.FC<SettingsOptionsProps> = ({ activeSetting }) => {
  console.log(activeSetting);
  return (
    <InsetPage size={SIZES.LARGE}>
      {activeSetting === SETTINGS_SIDEBAR_DATA.ACCOUNT ? (
        <SettingsAccount />
      ) : null}
    </InsetPage>
  );
};

export default SettingsOptions;
