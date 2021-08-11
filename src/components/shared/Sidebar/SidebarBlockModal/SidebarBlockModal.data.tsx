import React from "react";
import {
  BinderIcon,
  ReColorIcon,
  DeleteIcon,
  StudySetIcon,
} from "dekked-design-system";
import { ScrollerModalData } from "../../../../shared";

export enum SIDEBAR_BLOCK_MENU {
  ADD_BINDER = "ADD_BINDER",
  ADD_STUDYSET = "sidebar.blockModal.addStudySet",
  RECOLOR = "sidebar.blockModal.iconColour",
  DELETE = "sidebar.blockModal.delete",
}

export const FolderData: ScrollerModalData = [
  {
    value: SIDEBAR_BLOCK_MENU.ADD_BINDER,
    label: "sidebar.blockModal.addBinder",
    icon: <BinderIcon />,
  },
  {
    value: SIDEBAR_BLOCK_MENU.RECOLOR,
    label: "sidebar.blockModal.iconColour",
    icon: <ReColorIcon />,
  },
  {
    value: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
    label: "sidebar.blockModal.delete",
  },
];

export const BinderData: ScrollerModalData = [
  {
    value: SIDEBAR_BLOCK_MENU.ADD_STUDYSET,
    icon: <StudySetIcon />,
    label: "sidebar.blockModal.addStudySet",
  },
  {
    value: SIDEBAR_BLOCK_MENU.RECOLOR,
    label: "sidebar.blockModal.iconColour",
    icon: <ReColorIcon />,
  },
  {
    value: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
    label: "sidebar.blockModal.delete",
  },
];

export const StudySetData: ScrollerModalData = [
  {
    value: SIDEBAR_BLOCK_MENU.RECOLOR,
    label: "sidebar.blockModal.iconColour",
    icon: <ReColorIcon />,
  },
  {
    value: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
    label: "sidebar.blockModal.delete",
  },
];
