import React from "react";
import {
  BinderIcon,
  ReColorIcon,
  DeleteIcon,
  StudySetIcon,
} from "../../../../assets";

export enum SIDEBAR_BLOCK_MENU {
  ADD_BINDER = "Add binder",
  ADD_STUDYSET = "Add study set",
  RECOLOR = "Icon colour",
  DELETE = "Delete",
}

export type ModalData = {
  label: string;
  icon: React.ReactNode;
}[];

export const FolderData: ModalData = [
  {
    label: SIDEBAR_BLOCK_MENU.ADD_BINDER,
    icon: <BinderIcon />,
  },
  {
    label: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    label: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];

export const BinderData: ModalData = [
  {
    label: SIDEBAR_BLOCK_MENU.ADD_STUDYSET,
    icon: <StudySetIcon />,
  },
  {
    label: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    label: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];

export const StudySetData: ModalData = [
  {
    label: SIDEBAR_BLOCK_MENU.RECOLOR,
    icon: <ReColorIcon />,
  },
  {
    label: SIDEBAR_BLOCK_MENU.DELETE,
    icon: <DeleteIcon />,
  },
];
