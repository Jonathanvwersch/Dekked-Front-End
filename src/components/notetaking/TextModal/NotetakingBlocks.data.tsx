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
  CloseIcon,
  CodeIcon,
  ImageIcon,
} from "dekked-design-system";
import { ScrollerModalData, BLOCK_TYPES } from "../../../shared";

export enum NOTETAKING_BLOCKS {
  BODY = "studySet.notetaking.toolbar.text",
  LARGE_HEADING = "studySet.notetaking.toolbar.largeHeading",
  MEDIUM_HEADING = "studySet.notetaking.toolbar.mediumHeading",
  SMALL_HEADING = "studySet.notetaking.toolbar.smallHeading",
  BULLETED_LIST = "studySet.notetaking.toolbar.bulletedList",
  NUMBERED_LIST = "studySet.notetaking.toolbar.numberedList",
  QUOTE = "studySet.notetaking.toolbar.quote",
  DIVIDER = "studySet.notetaking.toolbar.divider",
  TODO = "studySet.notetaking.toolbar.todo",
  TOGGLE = "studySet.notetaking.toolbar.toggle",
  CODE = "studySet.notetaking.toolbar.codeBlock",
  IMAGE = "studySet.notetaking.toolbar.image",
  NO_DATA = "studySet.notetaking.noMatchingBlocks",
}

const blockData: ScrollerModalData = [
  {
    label: NOTETAKING_BLOCKS.BODY,
    icon: <BodyTextIcon />,
    value: BLOCK_TYPES.UNSTYLED,
  },
  {
    label: NOTETAKING_BLOCKS.LARGE_HEADING,
    value: BLOCK_TYPES.HEADER_ONE,
    icon: <H1Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.MEDIUM_HEADING,
    value: BLOCK_TYPES.HEADER_TWO,
    icon: <H2Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.SMALL_HEADING,
    value: BLOCK_TYPES.HEADER_THREE,
    icon: <H3Icon />,
  },
  {
    label: NOTETAKING_BLOCKS.BULLETED_LIST,
    value: BLOCK_TYPES.BULLETED_LIST,
    icon: <BulletedListIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.NUMBERED_LIST,
    value: BLOCK_TYPES.NUMBERED_LIST,
    icon: <NumberedListIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.QUOTE,
    value: BLOCK_TYPES.QUOTE,
    icon: <QuoteIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.CODE,
    value: BLOCK_TYPES.CODE,
    icon: <CodeIcon />,
  },
];

export const ConvertToBlockData: ScrollerModalData = [...blockData];

export const NoteTakingBlocksData: ScrollerModalData = [
  ...blockData,
  {
    label: NOTETAKING_BLOCKS.IMAGE,
    value: BLOCK_TYPES.IMAGE,
    icon: <ImageIcon />,
  },
  {
    label: NOTETAKING_BLOCKS.DIVIDER,
    value: BLOCK_TYPES.DIVIDER,
    icon: <DividerIcon rotate={ROTATE.NINETY} strokeWidth="1px" />,
  },
];

export const noMatchingBlocksData: ScrollerModalData = [
  {
    label: NOTETAKING_BLOCKS.NO_DATA,
    icon: <CloseIcon />,
    value: "",
    turnOffHover: true,
  },
];
