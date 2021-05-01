import React, { useContext, useState } from "react";
import { HFlex, IconActive, IconWrapper, Spacer } from "../../common";
import {
  BodyTextIcon,
  BoldIcon,
  CenterAlignIcon,
  DividerIcon,
  DropDownArrowIcon,
  ItalicsIcon,
  LeftAlignIcon,
  RightAlignIcon,
  StrikethroughIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from "../../../assets";
import { StudySetToolbarModal } from ".";
import { EditorContext } from "../../../contexts/EditorContext";
import { ThemeContext } from "styled-components/macro";
import { ThemeType } from "../../../styles/theme";
import { SIZES, TEXT_STYLES } from "../../../shared";
import { ROTATE } from "../../../assets/icons/Icon.types";
import {
  doesBlockContainStyle,
  removeSpecificBlockStyle,
} from "../../notetaking/Editor/Editor.helpers";

interface StudySetToolbarProps {
  toolbarFull?: boolean;
}

const StudySetToolbar: React.FC<StudySetToolbarProps> = ({
  toolbarFull = true,
}) => {
  const [blockOptionsModal, setBlockOptionsModal] = useState<boolean>(false);
  const theme: ThemeType = useContext(ThemeContext);
  const stylesToRemoveAlignment = [
    TEXT_STYLES.ALIGN_CENTER,
    TEXT_STYLES.ALIGN_LEFT,
    TEXT_STYLES.ALIGN_RIGHT,
  ];
  const stylesToRemoveScripts = [
    TEXT_STYLES.SUBSCRIPT,
    TEXT_STYLES.SUPERSCRIPT,
  ];

  const {
    toggleInlineStyle,
    toggleBlockStyle,
    editorState,
    setEditorState,
  } = useContext(EditorContext);

  return (
    <>
      <HFlex width="auto">
        {/*styling icons*/}
        <IconWrapper>
          <IconActive handleMouseDown={() => setBlockOptionsModal(true)}>
            <HFlex>
              <BodyTextIcon size={SIZES.MEDIUM} />
              <DropDownArrowIcon size={SIZES.MEDIUM} rotate={ROTATE.NINETY} />
            </HFlex>
          </IconActive>
          {blockOptionsModal && (
            <StudySetToolbarModal
              coords={{ top: 24, left: 4 }}
              open={blockOptionsModal}
              handleClose={() => setBlockOptionsModal(false)}
            />
          )}
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
                  removeSpecificBlockStyle(
                    [TEXT_STYLES.SUPERSCRIPT],
                    editorState
                  )
                )
              : toggleInlineStyle(
                  TEXT_STYLES.SUPERSCRIPT,
                  stylesToRemoveScripts
                );
          }}
        >
          <SuperscriptIcon size={SIZES.MEDIUM} />
        </IconActive>
        {/*Text align icons*/}
        {toolbarFull ? (
          <>
            <Spacer width={theme.spacers.size8} />
            <DividerIcon size={SIZES.MEDIUM} />
            <Spacer width={theme.spacers.size8} />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(
                  TEXT_STYLES.ALIGN_LEFT,
                  stylesToRemoveAlignment
                );
              }}
            >
              <LeftAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
            <Spacer width={theme.spacers.size8} />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(
                  TEXT_STYLES.ALIGN_CENTER,
                  stylesToRemoveAlignment
                );
              }}
            >
              <CenterAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
            <Spacer width={theme.spacers.size8} />
            <IconActive
              handleMouseDown={() => {
                toggleBlockStyle(
                  TEXT_STYLES.ALIGN_RIGHT,
                  stylesToRemoveAlignment
                );
              }}
            >
              <RightAlignIcon size={SIZES.MEDIUM} />
            </IconActive>
            <Spacer width={theme.spacers.size8} />
          </>
        ) : null}
      </HFlex>
    </>
  );
};

export default StudySetToolbar;
