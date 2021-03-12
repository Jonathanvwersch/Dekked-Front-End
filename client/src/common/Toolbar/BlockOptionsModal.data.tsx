import React from "react";
import {
  BodyTextIcon,
  H1Icon,
  H3Icon,
  BulletedListIcon,
  NumberedListIcon,
  H2Icon,
} from "../../assets";

export enum BLOCK_OPTIONS {
  BODY = "Body",
  LARGE_HEADING = "Large heading",
  MEDIUM_HEADING = "Medium heading",
  SMALL_HEADING = "Small heading",
  BULLETED_LIST = "Bulleted list",
  NUMBERED_LIST = "Numbered list",
}

export type ModalData = {
  action: string;
  icon: React.ReactNode;
}[];

export const BlockOptions: ModalData = [
  {
    action: BLOCK_OPTIONS.BODY,
    icon: <BodyTextIcon />,
  },
  {
    action: BLOCK_OPTIONS.LARGE_HEADING,
    icon: <H1Icon />,
  },
  {
    action: BLOCK_OPTIONS.MEDIUM_HEADING,
    icon: <H2Icon />,
  },
  {
    action: BLOCK_OPTIONS.SMALL_HEADING,
    icon: <H3Icon />,
  },
  {
    action: BLOCK_OPTIONS.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    action: BLOCK_OPTIONS.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
];
