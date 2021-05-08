import React, { ReactElement } from "react";
import {
  BodyTextIcon,
  BulletedListIcon,
  H1Icon,
  H2Icon,
  H3Icon,
  NumberedListIcon,
  QuoteIcon,
  TodoIcon,
} from "../../../assets";
import { BLOCK_TYPES, SIZES } from "../../../shared";

export const changeBlockTypeIcon = (
  currentBlockType: string
): { icon: ReactElement; id: string; text: string } => {
  switch (currentBlockType) {
    case BLOCK_TYPES.HEADER_ONE:
      return {
        icon: <H1Icon size={SIZES.MEDIUM} />,
        id: "HeaderOne",
        text: "studySet.notetaking.toolbar.largeHeading",
      };

    case BLOCK_TYPES.HEADER_TWO:
      return {
        icon: <H2Icon size={SIZES.MEDIUM} />,
        id: "HeaderTwo",
        text: "studySet.notetaking.toolbar.mediumHeading",
      };

    case BLOCK_TYPES.HEADER_THREE:
      return {
        // eslint-disable-next-line react/jsx-no-undef
        icon: <H3Icon size={SIZES.MEDIUM} />,
        id: "HeaderThree",
        text: "studySet.notetaking.toolbar.smallHeading",
      };

    case BLOCK_TYPES.BULLETED_LIST:
      return {
        icon: <BulletedListIcon size={SIZES.MEDIUM} />,
        id: "BulletedList",
        text: "studySet.notetaking.toolbar.bulletedList",
      };

    case BLOCK_TYPES.NUMBERED_LIST:
      return {
        icon: <NumberedListIcon size={SIZES.MEDIUM} />,
        id: "NumberedList",
        text: "studySet.notetaking.toolbar.numberedList",
      };

    case BLOCK_TYPES.QUOTE:
      return {
        icon: <QuoteIcon size={SIZES.MEDIUM} />,
        id: "Quote",
        text: "studySet.notetaking.toolbar.quote",
      };

    case BLOCK_TYPES.TODO:
      return {
        icon: <TodoIcon size={SIZES.MEDIUM} />,
        id: "Todo",
        text: "studySet.notetaking.toolbar.todo",
      };

    default:
      return {
        icon: <BodyTextIcon size={SIZES.MEDIUM} />,
        id: "Text",
        text: "studySet.notetaking.toolbar.text",
      };
  }
};
