import React from "react";
import {
  BinderIcon,
  ReColorIcon,
  EditIcon,
  DeleteIcon,
  StudySetIcon,
} from "../../../../assets";

export enum SIDEBAR_BLOCK_MENU {
  ADD_BINDER = "Add binder",
  ADD_STUDYSET = "Add study set",
  RECOLOR = "Icon colour",
  RENAME = "Rename",
  DELETE = "Delete",
}

export type ModalData = {
  action: string;
  icon: React.ReactNode;
}[];

export const FolderData: ModalData = [
  {
    action: SIDEBAR_BLOCK_MENU.ADD_BINDER,
    icon: <BinderIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.RENAME,
    icon: <EditIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];

export const BinderData: ModalData = [
  {
    action: SIDEBAR_BLOCK_MENU.ADD_STUDYSET,
    icon: <StudySetIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.RENAME,
    icon: <EditIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];

export const StudySetData: ModalData = [
  {
    action: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.RENAME,
    icon: <EditIcon />,
  },
  {
    action: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];
