import React from "react";
import {
  BodyTextIcon,
  H1Icon,
  H3Icon,
  BulletedListIcon,
  NumberedListIcon,
  H2Icon,
  QuoteIcon,
  DividerIcon,
  ROTATE,
  TodoIcon,
} from "../../../assets";
import { ScrollerModalData, BLOCK_TYPES } from "../../../shared";

export enum NOTETAKING_BLOCKS {
  BODY = "studySet.notetaking.toolbar.body",
  LARGE_HEADING = "studySet.notetaking.toolbar.largeHeading",
  MEDIUM_HEADING = "studySet.notetaking.toolbar.mediumHeading",
  SMALL_HEADING = "studySet.notetaking.toolbar.smallHeading",
  BULLETED_LIST = "studySet.notetaking.toolbar.bulletedList",
  NUMBERED_LIST = "studySet.notetaking.toolbar.numberedList",
  QUOTE = "studySet.notetaking.toolbar.quote",
  DIVIDER = "studySet.notetaking.toolbar.divider",
  TODO = "studySet.notetaking.toolbar.todo",
  TOGGLE = "studySet.notetaking.toolbar.toggle",
}

export const NoteTakingBlocksData: ScrollerModalData = [
  {
    label: NOTETAKING_BLOCKS.BODY,
    icon: <BodyTextIcon />,
    style: BLOCK_TYPES.UNSTYLED,
  },
  {
    label: NOTETAKING_BLOCKS.LARGE_HEADING,
    style: BLOCK_TYPES.HEADER_ONE,
    icon: <H1Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.MEDIUM_HEADING,
    style: BLOCK_TYPES.HEADER_TWO,
    icon: <H2Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.SMALL_HEADING,
    style: BLOCK_TYPES.HEADER_THREE,
    icon: <H3Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.BULLETED_LIST,
    style: BLOCK_TYPES.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.NUMBERED_LIST,
    style: BLOCK_TYPES.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.QUOTE,
    style: BLOCK_TYPES.QUOTE,
    icon: <QuoteIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.DIVIDER,
    style: BLOCK_TYPES.DIVIDER,
    icon: <DividerIcon rotate={ROTATE.NINETY} strokeWidth="1px" />,
  },
  {
    label: NOTETAKING_BLOCKS.TODO,
    style: BLOCK_TYPES.TODO,
    icon: <TodoIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.TOGGLE,
    style: BLOCK_TYPES.TOGGLE,
    icon: <TodoIcon />,
  },
];

export const placeholder = (style: string) => {
  switch (style) {
    case BLOCK_TYPES.UNSTYLED:
      return "studySet.notetaking.placeholder";

    case BLOCK_TYPES.HEADER_ONE:
      return "studySet.notetaking.toolbar.largeHeading";

    case BLOCK_TYPES.HEADER_TWO:
      return "studySet.notetaking.toolbar.mediumHeading";

    case BLOCK_TYPES.HEADER_THREE:
      return "studySet.notetaking.toolbar.smallHeading";

    case BLOCK_TYPES.BULLETED_LIST:
      return "studySet.notetaking.toolbar.bulletedList";

    case BLOCK_TYPES.NUMBERED_LIST:
      return "studySet.notetaking.toolbar.numberedList";

    case BLOCK_TYPES.QUOTE:
      return "studySet.notetaking.toolbar.quote";

    case BLOCK_TYPES.TODO:
      return "studySet.notetaking.toolbar.todo";

    default:
      return "";
  }
};
