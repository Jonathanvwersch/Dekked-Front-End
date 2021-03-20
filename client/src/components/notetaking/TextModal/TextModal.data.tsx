import React from "react";
import {
  BulletedListIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
} from "../../../assets";

export type ModalData = {
  label: string;
  style: string;
  icon: React.ReactNode;
}[];

export const TextModalData: ModalData = [
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
