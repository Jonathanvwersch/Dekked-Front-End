import React from "react";
import {
  BulletedListIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
} from "../../../assets";
import { ScrollerModalData, STYLES } from "../../../shared";

export const TextModalData: ScrollerModalData = [
  {
    label: "studySet.notetaking.toolbar.largeHeading",
    style: STYLES.HEADER_ONE,
    icon: <H1Icon />,
  },
  {
    label: "studySet.notetaking.toolbar.mediumHeading",
    style: STYLES.HEADER_TWO,
    icon: <H2Icon />,
  },
  {
    label: "studySet.notetaking.toolbar.smallHeading",
    style: STYLES.HEADER_THREE,
    icon: <H3Icon />,
    divider: true,
  },
  {
    label: "studySet.notetaking.toolbar.bulletedList",
    style: STYLES.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    label: "studySet.notetaking.toolbar.numberedList",
    style: STYLES.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
];
