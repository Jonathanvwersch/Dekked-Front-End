import React, { useContext, useRef, useState } from "react";
import { HFlex, IconActive, IconWrapper, Spacer, Tooltip } from "../../common";
import {
  BoldIcon,
  DropDownArrowIcon,
  ItalicsIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "../../../assets";
import { StudySetToolbarModal } from ".";

import { CoordsType, SIZES, TEXT_STYLES } from "../../../shared";
import { ROTATE } from "../../../assets/icons/Icon.types";
import {
  doesBlockContainStyle,
  removeSpecificBlockStyle,
} from "../../notetaking/Editor/Editor.helpers";
import { EditorContext } from "../../../contexts";
import { ThemeContext } from "styled-components";
import { positionModals } from "../../../helpers";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { changeBlockTypeIcon } from "./StudySetToolbar.helpers";

interface ChangeTextStyleProps {}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = () => {
  const [blockOptionsModal, setBlockOptionsModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const blockOptionsRef = useRef<HTMLButtonElement>(null);
  const theme = useContext(ThemeContext);
  const stylesToRemoveScripts = [
    TEXT_STYLES.SUBSCRIPT,
    TEXT_STYLES.SUPERSCRIPT,
  ];

  const {
    toggleInlineStyle,
    editorState,
    setEditorState,
    currentBlock,
  } = useContext(EditorContext);

  const handleBlockOptionsModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockOptionsModal(true);
    setCoords(positionModals(e, undefined, blockOptionsRef));
  };

  const currentBlockType = currentBlock.getType();

  return (
    <>
      <IconWrapper>
        <IconActive
          iconActiveRef={blockOptionsRef}
          handleMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleBlockOptionsModal(e)
          }
        >
          <Tooltip
            id={changeBlockTypeIcon(currentBlockType).id}
            text={changeBlockTypeIcon(currentBlockType).text}
          >
            <HFlex>
              {changeBlockTypeIcon(currentBlockType).icon}
              <DropDownArrowIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />
            </HFlex>
          </Tooltip>
        </IconActive>
      </IconWrapper>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.BOLD);
        }}
      >
        <Tooltip id="BoldStyle" text="tooltips.studySet.toolbar.bold">
          <BoldIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.ITALIC);
        }}
      >
        <Tooltip id="ItalicsStyle" text="tooltips.studySet.toolbar.italics">
          <ItalicsIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.UNDERLINE);
        }}
      >
        <Tooltip id="UnderlineStyle" text="tooltips.studySet.toolbar.underline">
          <UnderlineIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.STRIKETHROUGH);
        }}
      >
        <Tooltip
          id="StrikethroughtStyle"
          text="tooltips.studySet.toolbar.strikethrough"
        >
          <StrikethroughIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          doesBlockContainStyle(editorState, TEXT_STYLES.SUBSCRIPT)
            ? setEditorState(
                removeSpecificBlockStyle([TEXT_STYLES.SUBSCRIPT], editorState)
              )
            : toggleInlineStyle(TEXT_STYLES.SUBSCRIPT, stylesToRemoveScripts);
        }}
        fillType={FILL_TYPE.STROKE}
      >
        <Tooltip id="SubscriptStyle" text="tooltips.studySet.toolbar.subscript">
          <SubscriptIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          doesBlockContainStyle(editorState, TEXT_STYLES.SUPERSCRIPT)
            ? setEditorState(
                removeSpecificBlockStyle([TEXT_STYLES.SUPERSCRIPT], editorState)
              )
            : toggleInlineStyle(TEXT_STYLES.SUPERSCRIPT, stylesToRemoveScripts);
        }}
        fillType={FILL_TYPE.STROKE}
      >
        <Tooltip
          id="UnderlineStyle"
          text="tooltips.studySet.toolbar.superscript"
        >
          <SuperscriptIcon size={SIZES.MEDIUM} />
        </Tooltip>
      </IconActive>
      <StudySetToolbarModal
        coords={coords}
        open={blockOptionsModal}
        handleClose={() => setBlockOptionsModal(false)}
      />
    </>
  );
};

export default ChangeTextStyles;
