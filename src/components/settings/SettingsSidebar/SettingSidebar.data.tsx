import React from "react";
import { AccountIcon } from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export enum SETTINGS_SIDEBAR_DATA {
  ACCOUNT = "settings.sidebar.account",
}

export const SettingsSidebarData: ScrollerModalData = [
  {
    label: SETTINGS_SIDEBAR_DATA.ACCOUNT,
    icon: <AccountIcon />,
  },
];
