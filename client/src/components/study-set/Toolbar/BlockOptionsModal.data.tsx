import React from "react";
import {
  BodyTextIcon,
  H1Icon,
  H3Icon,
  BulletedListIcon,
  NumberedListIcon,
  H2Icon,
} from "../../../assets";

export enum BLOCK_OPTIONS {
  BODY = "Body",
  LARGE_HEADING = "Large heading",
  MEDIUM_HEADING = "Medium heading",
  SMALL_HEADING = "Small heading",
  BULLETED_LIST = "Bulleted list",
  NUMBERED_LIST = "Numbered list",
}

export type ModalData = {
  label: string;
  icon: React.ReactNode;
  divider?: boolean;
}[];

export const BlockOptions: ModalData = [
  {
    label: BLOCK_OPTIONS.BODY,
    icon: <BodyTextIcon />,
  },
  {
    label: BLOCK_OPTIONS.LARGE_HEADING,
    icon: <H1Icon />,
  },
  {
    label: BLOCK_OPTIONS.MEDIUM_HEADING,
    icon: <H2Icon />,
  },
  {
    label: BLOCK_OPTIONS.SMALL_HEADING,
    icon: <H3Icon />,
    divider: true,
  },
  {
    label: BLOCK_OPTIONS.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    label: BLOCK_OPTIONS.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
];
