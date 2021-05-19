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
  getCurrentBlock,
  removeSpecificBlockStyle,
  toggleInlineStyle,
} from "../../notetaking/Editor/Editor.helpers";
import { ThemeContext } from "styled-components";
import { positionModals } from "../../../helpers";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { changeBlockTypeIcon } from "./StudySetToolbar.helpers";
import { EditorState } from "draft-js";

interface ChangeTextStyleProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  headerRef?: React.RefObject<HTMLDivElement>;
  isDisabled?: boolean;
  iconSize?: SIZES;
}

const ChangeTextStyles: React.FC<ChangeTextStyleProps> = ({
  editorState,
  setEditorState,
  isDisabled,
  iconSize = SIZES.MEDIUM,
}) => {
  const [blockOptionsModal, setBlockOptionsModal] = useState<boolean>(false);
  const [coords, setCoords] = useState<CoordsType>();
  const blockOptionsRef = useRef<HTMLButtonElement>(null);
  const theme = useContext(ThemeContext);
  const stylesToRemoveScripts = [
    TEXT_STYLES.SUBSCRIPT,
    TEXT_STYLES.SUPERSCRIPT,
  ];

  const handleBlockOptionsModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockOptionsModal(true);
    setCoords(positionModals(e, 272, blockOptionsRef));
  };

  const currentBlockType = getCurrentBlock(editorState).getType() || "unstyled";

  return (
    <>
      <IconWrapper>
        <IconActive
          isDisabled={isDisabled}
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
              <DropDownArrowIcon size={iconSize} rotate={ROTATE.NINETY} />
            </HFlex>
          </Tooltip>
        </IconActive>
      </IconWrapper>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setEditorState(toggleInlineStyle(editorState, TEXT_STYLES.BOLD));
        }}
        isDisabled={isDisabled}
      >
        <Tooltip id="BoldStyle" text="tooltips.studySet.toolbar.bold">
          <BoldIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setEditorState(toggleInlineStyle(editorState, TEXT_STYLES.ITALIC));
        }}
        isDisabled={isDisabled}
      >
        <Tooltip id="ItalicsStyle" text="tooltips.studySet.toolbar.italics">
          <ItalicsIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setEditorState(toggleInlineStyle(editorState, TEXT_STYLES.UNDERLINE));
        }}
        isDisabled={isDisabled}
      >
        <Tooltip id="UnderlineStyle" text="tooltips.studySet.toolbar.underline">
          <UnderlineIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          setEditorState(
            toggleInlineStyle(editorState, TEXT_STYLES.STRIKETHROUGH)
          );
        }}
        isDisabled={isDisabled}
      >
        <Tooltip
          id="StrikethroughtStyle"
          text="tooltips.studySet.toolbar.strikethrough"
        >
          <StrikethroughIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          doesBlockContainStyle(editorState, TEXT_STYLES.SUBSCRIPT)
            ? setEditorState(
                removeSpecificBlockStyle([TEXT_STYLES.SUBSCRIPT], editorState)
              )
            : setEditorState(
                toggleInlineStyle(
                  editorState,
                  TEXT_STYLES.SUBSCRIPT,
                  stylesToRemoveScripts
                )
              );
        }}
        fillType={FILL_TYPE.STROKE}
        isDisabled={isDisabled}
      >
        <Tooltip id="SubscriptStyle" text="tooltips.studySet.toolbar.subscript">
          <SubscriptIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={() => {
          doesBlockContainStyle(editorState, TEXT_STYLES.SUPERSCRIPT)
            ? setEditorState(
                removeSpecificBlockStyle([TEXT_STYLES.SUPERSCRIPT], editorState)
              )
            : setEditorState(
                toggleInlineStyle(
                  editorState,
                  TEXT_STYLES.SUPERSCRIPT,
                  stylesToRemoveScripts
                )
              );
        }}
        fillType={FILL_TYPE.STROKE}
        isDisabled={isDisabled}
      >
        <Tooltip
          id="UnderlineStyle"
          text="tooltips.studySet.toolbar.superscript"
        >
          <SuperscriptIcon size={iconSize} />
        </Tooltip>
      </IconActive>
      <StudySetToolbarModal
        editorState={editorState}
        setEditorState={setEditorState}
        coords={coords}
        open={blockOptionsModal}
        handleClose={() => setBlockOptionsModal(false)}
      />
    </>
  );
};

export default ChangeTextStyles;
