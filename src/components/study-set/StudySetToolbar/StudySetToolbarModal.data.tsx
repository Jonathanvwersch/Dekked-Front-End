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
  BODY = "studySet.notetaking.toolbar.body",
  LARGE_HEADING = "studySet.notetaking.toolbar.largeHeading",
  MEDIUM_HEADING = "studySet.notetaking.toolbar.mediumHeading",
  SMALL_HEADING = "studySet.notetaking.toolbar.smallHeading",
  BULLETED_LIST = "studySet.notetaking.toolbar.bulletedList",
  NUMBERED_LIST = "studySet.notetaking.toolbar.numberedList",
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
