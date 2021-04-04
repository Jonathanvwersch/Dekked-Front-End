import React from "react";
import {
  BulletedListIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
} from "../../../assets";
import { ScrollerModalData } from "../../../shared";

export const TextModalData: ScrollerModalData = [
  {
    label: "studySet.notetaking.toolbar.largeHeading",
    style: "header-one",
    icon: <H1Icon />,
  },
  {
    label: "studySet.notetaking.toolbar.mediumHeading",
    style: "header-two",
    icon: <H2Icon />,
  },
  {
    label: "studySet.notetaking.toolbar.smallHeading",
    style: "header-three",
    icon: <H3Icon />,
    divider: true,
  },
  {
    label: "studySet.notetaking.toolbar.bulletedList",
    style: "unordered-list-item",
    icon: <BulletedListIcon />,
  },
  {
    label: "studySet.notetaking.toolbar.numberedList",
    style: "ordered-list-item",
    icon: <NumberedListIcon />,
  },
];
