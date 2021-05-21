import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components/macro";
import { HFlex, IconActive, ShadowCard } from "../../common";
import { SIZES } from "../../../shared";
import StudyModeToolbar from "../StudyModeToolbar/StudyModeToolbar";
import { LogoIcon } from "../../../assets";
import { FILL_TYPE } from "../../common/IconActive/IconActive";
import { isEmpty } from "lodash";
import { convertFromRaw, EditorState, RawDraftContentBlock } from "draft-js";
import RichEditor from "../../notetaking/Editor/RichEditor";

interface StudySetFlashcardProps {
  flippedState: boolean;
  frontBlocks?: string[];
  backBlocks?: string[];
  linked?: boolean;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  linked,
  flippedState,
}) => {
  const theme = useContext(ThemeContext);
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());

  // Set editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks[0] !== null) {
      const parsedBlocks: RawDraftContentBlock[] = frontBlocks.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontBlocks]);

  // Set editor state on mount
  useEffect(() => {
    if (backBlocks && !isEmpty(backBlocks) && backBlocks[0] !== null) {
      const parsedBlocks: RawDraftContentBlock[] = backBlocks.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setBackFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [backBlocks]);

  return (
    <>
      <FlashcardContainer>
        <Flashcard
          padding={`${theme.spacers.size48} ${theme.spacers.size48}`}
          borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
          height="600px"
        >
          <RichEditor
            editorState={
              flippedState
                ? frontFlashcardEditorState
                : backFlashcardEditorState
            }
            setEditorState={
              flippedState
                ? setFrontFlashcardEditorState
                : setBackFlashcardEditorState
            }
            isEditable={false}
          />
        </Flashcard>
        {linked ? (
          <LogoIconContainer fillType={FILL_TYPE.STROKE}>
            <LogoIcon size={SIZES.LARGE} />
          </LogoIconContainer>
        ) : null}
        <StudyModeToolbar />
      </FlashcardContainer>
    </>
  );
};

const Flashcard = styled(ShadowCard)`
  z-index: 0;
`;

const FlashcardContainer = styled(HFlex)`
  justify-content: center;
  position: relative;
`;

const LogoIconContainer = styled(IconActive)`
  position: absolute;
  bottom: 16px;
  z-index: 1;
`;

export default StudySetFlashcard;
