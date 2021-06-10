import React from "react";
import { AccountIcon, AppearanceIcon } from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export enum SETTINGS_SIDEBAR_DATA {
  ACCOUNT = "settings.sidebar.account",
  APPEARANCE = "settings.sidebar.appearance",
}

export const SettingsSidebarData: ScrollerModalData = [
  {
    label: SETTINGS_SIDEBAR_DATA.ACCOUNT,
    icon: <AccountIcon />,
  },
  {
    label: SETTINGS_SIDEBAR_DATA.APPEARANCE,
    icon: <AppearanceIcon />,
  },
];
