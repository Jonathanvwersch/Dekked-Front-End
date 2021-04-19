import React from "react";
import {
  BodyTextIcon,
  H1Icon,
  H3Icon,
  BulletedListIcon,
  NumberedListIcon,
  H2Icon,
} from "../../../assets";
import { ScrollerModalData, STYLES } from "../../../shared";

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
    style: STYLES.UNSTYLED,
  },
  {
    label: BLOCK_OPTIONS.LARGE_HEADING,
    style: STYLES.HEADER_ONE,
    icon: <H1Icon />,
  },
  {
    label: BLOCK_OPTIONS.MEDIUM_HEADING,
    style: STYLES.HEADER_TWO,
    icon: <H2Icon />,
  },
  {
    label: BLOCK_OPTIONS.SMALL_HEADING,
    style: STYLES.HEADER_THREE,
    icon: <H3Icon />,
    divider: true,
  },
  {
    label: BLOCK_OPTIONS.BULLETED_LIST,
    style: STYLES.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    label: BLOCK_OPTIONS.NUMBERED_LIST,
    style: STYLES.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
];
