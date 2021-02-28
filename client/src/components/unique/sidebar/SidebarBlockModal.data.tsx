import React from "react";
import {
  BinderIcon,
  ReColorIcon,
  EditIcon,
  DeleteIcon,
  StudySetIcon,
} from "../../../assets";

// declare global variables
const ADDBINDER: string = "Add binder";
const ADDSTUDYSET: string = "Add study set";
const ICONRECOLOUR: string = "Icon colour";
export const RENAME: string = "Rename";
export const DELETE: string = "Delete";
export const ADD: string = "Add";
export const RECOLOR: string = "Recolour";

export type ModalData = {
  action: string;
  icon: React.ReactNode;
  type: string;
}[];

export const FolderData: ModalData = [
  {
    action: ADDBINDER,
    icon: <BinderIcon />,
    type: ADD,
  },
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
    type: RECOLOR,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
    type: RENAME,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
    type: DELETE,
  },
];

export const BinderData: ModalData = [
  {
    action: ADDSTUDYSET,
    icon: <StudySetIcon />,
    type: ADD,
  },
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
    type: RECOLOR,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
    type: RENAME,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
    type: DELETE,
  },
];

export const StudySetData: ModalData = [
  {
    action: ICONRECOLOUR,
    icon: <ReColorIcon />,
    type: RECOLOR,
  },
  {
    action: RENAME,
    icon: <EditIcon />,
    type: RENAME,
  },
  {
    action: DELETE,
    icon: <DeleteIcon />,
    type: DELETE,
  },
];
