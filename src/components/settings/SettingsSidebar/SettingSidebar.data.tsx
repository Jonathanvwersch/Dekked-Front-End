import React from "react";
import { AccountIcon, AppearanceIcon } from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export enum SETTINGS_SIDEBAR_DATA {
  ACCOUNT = "ACCOUNT",
  APPEARANCE = "APPEARANCE",
}

export const SettingsSidebarData: ScrollerModalData = [
  {
    value: SETTINGS_SIDEBAR_DATA.ACCOUNT,
    label: "settings.sidebar.account",
    icon: <AccountIcon />,
  },
  {
    value: SETTINGS_SIDEBAR_DATA.APPEARANCE,
    label: "settings.sidebar.appearance",
    icon: <AppearanceIcon />,
  },
];
