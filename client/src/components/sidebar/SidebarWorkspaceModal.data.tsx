import React from "react";
import {
  BinderIcon,
  ReColorIcon,
  EditIcon,
  DeleteIcon,
  StudySetIcon,
} from "../../assets";

// declare global variables
const ADDBINDER: string = "Add binder";
const ADDSTUDYSET: string = "Add study set";
const ICONRECOLOUR: string = "Icon colour";
const RENAME: string = "Rename";
const DELETE: string = "Delete";

export type ModalData = {
  action: string;
  icon: React.ReactNode;
}[];

export const FolderData: ModalData = [
  {
    action: ADDBINDER,
    icon: <BinderIcon />,
  },
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
  },
];

export const BinderData: ModalData = [
  {
    action: ADDSTUDYSET,
    icon: <StudySetIcon />,
  },
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
  },
];

export const StudySetData: ModalData = [
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
  },
];
