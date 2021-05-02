import React, { useContext, useRef, useState } from "react";
import { HFlex, IconActive, IconWrapper, Spacer } from "../../common";
import {
  BodyTextIcon,
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

  const { toggleInlineStyle, editorState, setEditorState } = useContext(
    EditorContext
  );

  const handleBlockOptionsModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setBlockOptionsModal(true);
    setCoords(positionModals(e, undefined, blockOptionsRef));
  };

  return (
    <>
      <IconWrapper>
        <IconActive
          iconActiveRef={blockOptionsRef}
          handleMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleBlockOptionsModal(e)
          }
        >
          <HFlex>
            <BodyTextIcon size={SIZES.MEDIUM} />
            <DropDownArrowIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />
          </HFlex>
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
        <BoldIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.ITALIC);
        }}
      >
        <ItalicsIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.UNDERLINE);
        }}
      >
        <UnderlineIcon size={SIZES.MEDIUM} />
      </IconActive>
      <Spacer width={theme.spacers.size8} />
      <IconActive
        handleMouseDown={(e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          toggleInlineStyle(TEXT_STYLES.STRIKETHROUGH);
        }}
      >
        <StrikethroughIcon size={SIZES.MEDIUM} />
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
      >
        <SubscriptIcon size={SIZES.MEDIUM} />
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
      >
        <SuperscriptIcon size={SIZES.MEDIUM} />
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
