import React, { ReactElement } from "react";
import {
  BodyTextIcon,
  BoldIcon,
  BulletedListIcon,
  CenterAlignIcon,
  LeftAlignIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  ItalicsIcon,
  NumberedListIcon,
  QuoteIcon,
  RemoveFormattingIcon,
  RightAlignIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  TodoIcon,
  UnderlineIcon,
} from "../../../assets";
import {
  BLOCK_TYPES,
  ScrollerModalData,
  SIZES,
  TEXT_STYLES,
} from "../../../shared";
import { NOTETAKING_BLOCKS } from "../../notetaking/TextModal/NotetakingBlocks.data";

export const changeBlockTypeIcons = (
  currentBlockType: string
): { icon: ReactElement; id: string; text: string } => {
  switch (currentBlockType) {
    case BLOCK_TYPES.HEADER_ONE:
      return {
        icon: <H1Icon size={SIZES.MEDIUM} />,
        id: "HeaderOne",
        text: NOTETAKING_BLOCKS.LARGE_HEADING,
      };

    case BLOCK_TYPES.HEADER_TWO:
      return {
        icon: <H2Icon size={SIZES.MEDIUM} />,
        id: "HeaderTwo",
        text: NOTETAKING_BLOCKS.MEDIUM_HEADING,
      };

    case BLOCK_TYPES.HEADER_THREE:
      return {
        // eslint-disable-next-line react/jsx-no-undef
        icon: <H3Icon size={SIZES.MEDIUM} />,
        id: "HeaderThree",
        text: NOTETAKING_BLOCKS.SMALL_HEADING,
      };

    case BLOCK_TYPES.BULLETED_LIST:
      return {
        icon: <BulletedListIcon size={SIZES.MEDIUM} />,
        id: "BulletedList",
        text: NOTETAKING_BLOCKS.BULLETED_LIST,
      };

    case BLOCK_TYPES.NUMBERED_LIST:
      return {
        icon: <NumberedListIcon size={SIZES.MEDIUM} />,
        id: "NumberedList",
        text: NOTETAKING_BLOCKS.NUMBERED_LIST,
      };

    case BLOCK_TYPES.QUOTE:
      return {
        icon: <QuoteIcon size={SIZES.MEDIUM} />,
        id: "Quote",
        text: NOTETAKING_BLOCKS.QUOTE,
      };

    case BLOCK_TYPES.TODO:
      return {
        icon: <TodoIcon size={SIZES.MEDIUM} />,
        id: "Todo",
        text: NOTETAKING_BLOCKS.TODO,
      };

    default:
      return {
        icon: <BodyTextIcon size={SIZES.MEDIUM} />,
        id: "Text",
        text: NOTETAKING_BLOCKS.BODY,
      };
  }
};

export enum TextStylesTypes {
  BOLD = "studySet.toolbar.bold",
  ITALICS = "studySet.toolbar.italics",
  CENTER_ALIGN = "studySet.toolbar.underline",
}

export const changeTextStylesData: ScrollerModalData = [
  {
    icon: <BoldIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.BOLD,
    label: "tooltips.studySet.toolbar.bold",
    id: "Bold",
  },
  {
    icon: <ItalicsIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.ITALIC,
    label: "tooltips.studySet.toolbar.italics",
    id: "Italics",
  },
  {
    icon: <UnderlineIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.UNDERLINE,
    label: "tooltips.studySet.toolbar.underline",
    id: "Underline",
  },
  {
    icon: <StrikethroughIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.STRIKETHROUGH,
    label: "tooltips.studySet.toolbar.strikethrough",
    id: "Strikethrough",
  },
  {
    icon: <SubscriptIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.SUBSCRIPT,
    label: "tooltips.studySet.toolbar.subscript",
    id: "Subscript",
  },
  {
    icon: <SuperscriptIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.SUPERSCRIPT,
    label: "tooltips.studySet.toolbar.superscript",
    id: "Superscript",
  },
  {
    icon: <RemoveFormattingIcon size={SIZES.MEDIUM} />,
    value: TEXT_STYLES.REMOVE_FORMATTING,
    label: "tooltips.studySet.toolbar.removeStyles",
    id: "RemoveFormatting",
  },
];

export enum AlignmentTypes {
  LEFT_ALIGN = "left",
  RIGHT_ALIGN = "right",
  CENTER_ALIGN = "center",
}

export const changeAlignmentData: ScrollerModalData = [
  {
    label: "studySet.toolbar.leftAlign",
    icon: <LeftAlignIcon size={SIZES.MEDIUM} />,
    value: AlignmentTypes.LEFT_ALIGN,
  },
  {
    label: "studySet.toolbar.centerAlign",
    icon: <CenterAlignIcon size={SIZES.MEDIUM} />,
    value: AlignmentTypes.CENTER_ALIGN,
  },
  {
    label: "studySet.toolbar.rightAlign",
    icon: <RightAlignIcon size={SIZES.MEDIUM} />,
    value: AlignmentTypes.RIGHT_ALIGN,
  },
];
