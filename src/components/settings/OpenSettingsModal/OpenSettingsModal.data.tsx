import React from "react";
import { LogOutIcon, SettingsIcon } from "dekked-design-system";
import { ScrollerModalData } from "../../../shared";

export enum OPEN_SETTINGS_DATA {
  SETTINGS = "SETTINGS",
  LOGOUT = "LOGOUT",
}

export const OpenSettingsModalData: ScrollerModalData = [
  {
    label: "sidebar.settingsModal.settings",
    value: OPEN_SETTINGS_DATA.SETTINGS,
    icon: <SettingsIcon />,
  },
  {
    label: "sidebar.settingsModal.logOut",
    value: OPEN_SETTINGS_DATA.LOGOUT,
    icon: <LogOutIcon />,
  },
];
