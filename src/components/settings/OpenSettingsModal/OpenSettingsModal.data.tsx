import React from "react";
import { LogOutIcon, SettingsIcon } from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export enum OPEN_SETTINGS_DATA {
  SETTINGS = "sidebar.settingsModal.settings",
  LOGOUT = "sidebar.settingsModal.logOut",
}

export const OpenSettingsModalData: ScrollerModalData = [
  {
    label: OPEN_SETTINGS_DATA.SETTINGS,
    icon: <SettingsIcon />,
  },
  {
    label: OPEN_SETTINGS_DATA.LOGOUT,
    icon: <LogOutIcon />,
  },
];
