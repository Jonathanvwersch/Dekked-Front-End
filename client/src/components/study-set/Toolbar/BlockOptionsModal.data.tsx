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
  style: string;
  divider?: boolean;
}[];

export const BlockOptions: ModalData = [
  {
    label: "Body",
    icon: <BodyTextIcon />,
    style: "unstyled",
  },
  {
    label: "Large heading",
    style: "header-one",
    icon: <H1Icon />,
  },
  {
    label: "Medium heading",
    style: "header-two",
    icon: <H2Icon />,
  },
  {
    label: "Small heading",
    style: "header-three",
    icon: <H3Icon />,
  },
  {
    label: "Bulleted list",
    style: "unordered-list-item",
    icon: <BulletedListIcon />,
  },
  {
    label: "Numbered list",
    style: "ordered-list-item",
    icon: <NumberedListIcon />,
  },
];
