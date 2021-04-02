import React from "react";
import {
  BodyTextIcon,
  H1Icon,
  H3Icon,
  BulletedListIcon,
  NumberedListIcon,
  H2Icon,
} from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export enum BLOCK_OPTIONS {
  BODY = "Body",
  LARGE_HEADING = "Large heading",
  MEDIUM_HEADING = "Medium heading",
  SMALL_HEADING = "Small heading",
  BULLETED_LIST = "Bulleted list",
  NUMBERED_LIST = "Numbered list",
}

export const StudySetToolbarModalData: ScrollerModalData = [
  {
    label: BLOCK_OPTIONS.BODY,
    icon: <BodyTextIcon />,
    style: "unstyled",
  },
  {
    label: BLOCK_OPTIONS.LARGE_HEADING,
    style: "header-one",
    icon: <H1Icon />,
  },
  {
    label: BLOCK_OPTIONS.MEDIUM_HEADING,
    style: "header-two",
    icon: <H2Icon />,
  },
  {
    label: BLOCK_OPTIONS.SMALL_HEADING,
    style: "header-three",
    icon: <H3Icon />,
    divider: true,
  },
  {
    label: BLOCK_OPTIONS.BULLETED_LIST,
    style: "unordered-list-item",
    icon: <BulletedListIcon />,
  },
  {
    label: BLOCK_OPTIONS.NUMBERED_LIST,
    style: "ordered-list-item",
    icon: <NumberedListIcon />,
  },
];
