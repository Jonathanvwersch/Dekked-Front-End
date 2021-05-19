import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";
import {
  Card,
  HFlex,
  Spacer,
  VFlex,
  Text,
  Button,
  IconActive,
  ShadowCard,
  ComponentLoadingSpinner,
  IconWrapper,
} from "../../common";
import { DeleteIcon } from "../../../assets";
import { StudySetToolbar } from "..";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RawDraftContentBlock,
} from "draft-js";
import FlashcardNoteTaker from "../../notetaking/FlashcardNoteTaker";
import { useFlashcards } from "../../../services/file-structure";
import { debounce, isEmpty } from "lodash";

interface StudySetFlashcardProps {
  flashcardId?: string;
  frontText?: string[];
  backText?: string[];
  linked?: boolean;
  index?: number;
  loading?: boolean;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontText,
  backText,
  linked = false,
  index,
  loading,
  flashcardId,
}) => {
  const [frontHasFocus, setFrontHasFocus] = useState<boolean>(false);
  const [backHasFocus, setBackHasFocus] = useState<boolean>(false);
  const { theme, formatMessage } = usePageSetupHelpers();
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [currentSide, setCurrentSide] = useState<"front" | "back">();
  const [saving, setSaving] = useState<boolean>(false);

  const { saveFlashcard } = useFlashcards();

  // Make call to server to save text blocks
  const onSave = async (
    frontEditorState: EditorState,
    backEditorState: EditorState,
    id: string | undefined
  ) => {
    setSaving(true);
    const rawFrontContent = convertToRaw(frontEditorState.getCurrentContent());
    const rawBackContent = convertToRaw(backEditorState.getCurrentContent());
    const frontKeys = rawFrontContent.blocks.map((val) => val.key);
    const backKeys = rawBackContent.blocks.map((val) => val.key);
    const frontBlocks = rawFrontContent.blocks.map((val) =>
      JSON.stringify(val)
    );
    const backBlocks = rawBackContent.blocks.map((val) => JSON.stringify(val));
    const response = await saveFlashcard({
      front_blocks: frontBlocks,
      front_draft_keys: frontKeys,
      back_blocks: backBlocks,
      back_draft_keys: backKeys,
      id,
    });
    if (response.success) {
      setSaving(!response.success);
    }
  };

  // Debounce function to autosave notes
  const debounced = debounce(
    (editorState: EditorState, id: string | undefined) => {
      if (currentSide === "front") {
        console.log("fornt");
        onSave(editorState, backFlashcardEditorState, id);
      } else {
        console.log("in the back");
        onSave(frontFlashcardEditorState, editorState, id);
      }
    },
    750
  );

  const autoSave = useCallback(
    (editorState: EditorState, id: string | undefined) => {
      debounced(editorState, id);
    },
    [currentSide]
  );

  useEffect(() => {
    frontHasFocus && setCurrentSide("front");
    backHasFocus && setCurrentSide("back");
  }, [frontHasFocus, backHasFocus]);

  // Set editor state on mount
  useEffect(() => {
    if (frontText && !isEmpty(frontText)) {
      const parsedBlocks: RawDraftContentBlock[] = frontText.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontText]);

  // Set editor state on mount
  useEffect(() => {
    if (backText && !isEmpty(backText)) {
      const parsedBlocks: RawDraftContentBlock[] = backText.map((blocks) =>
        JSON.parse(blocks)
      );
      const savedState = convertFromRaw({
        blocks: parsedBlocks,
        entityMap: {},
      });
      setBackFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [backText]);

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === "front"
              ? formatMessage("studySet.flashcards.front")
              : formatMessage("studySet.flashcards.back")}
          </Text>
        </CardHeader>
        <Spacer height={theme.spacers.size8} />
        <TextCard
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          {!linked && loading ? (
            <ComponentLoadingSpinner />
          ) : (
            <FlashcardNoteTaker
              id={flashcardId}
              autoSave={autoSave}
              hasFocus={side === "front" ? frontHasFocus : backHasFocus}
              setHasFocus={
                side === "front" ? setFrontHasFocus : setBackHasFocus
              }
              editorState={
                side === "front"
                  ? frontFlashcardEditorState
                  : backFlashcardEditorState
              }
              setEditorState={
                side === "front"
                  ? setFrontFlashcardEditorState
                  : setBackFlashcardEditorState
              }
            />
          )}
        </TextCard>
      </TextCardContainer>
    );
  };

  const editorState =
    currentSide === "front"
      ? frontFlashcardEditorState
      : backFlashcardEditorState;

  const setEditorState =
    currentSide === "front"
      ? setFrontFlashcardEditorState
      : setBackFlashcardEditorState;

  const toolbar = (
    <StudySetToolbar
      iconSize={SIZES.SMALL}
      editorState={editorState}
      setEditorState={setEditorState}
      isDisabled={!frontHasFocus && !backHasFocus}
    />
  );

  const topbar = () => {
    return linked ? (
      <HFlex justifyContent="center" minHeight={theme.spacers.size24}>
        {toolbar}
      </HFlex>
    ) : (
      <HFlex justifyContent="space-between" minHeight={theme.spacers.size24}>
        <Text>{index}</Text>
        {toolbar}
        {saving ? (
          <IconWrapper>
            <ComponentLoadingSpinner size={SIZES.SMALL} />
          </IconWrapper>
        ) : (
          <IconActive>
            <DeleteIcon />
          </IconActive>
        )}
      </HFlex>
    );
  };

  return (
    <ShadowCard
      backgroundColor={theme.colors.secondary}
      padding={theme.spacers.size16}
      borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      zIndex="15"
      width="99%"
    >
      <VFlex>
        {topbar()}
        <Spacer height={theme.spacers.size8} />
        <HFlex justifyContent="space-between" alignItems="stretch">
          {frontAndBack("front")}
          {frontAndBack("back")}
        </HFlex>
        <Spacer height={theme.spacers.size8} />
        {linked ? (
          <HFlex justifyContent="flex-end">
            <Button buttonStyle={BUTTON_THEME.PRIMARY} isLoading={saving}>
              {formatMessage("generics.save")}
            </Button>
          </HFlex>
        ) : null}
      </VFlex>
    </ShadowCard>
  );
};

const TextCardContainer = styled(Card)`
  max-width: 49%;
  width: 49%;
  position: relative;
`;

const TextCard = styled(Card)<{ linked: boolean }>`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  padding: ${({ theme }) => `${theme.spacers.size16} ${theme.spacers.size24}`};
  min-height: ${({ linked }) => (linked ? "150px" : "96px")};
  max-height: 200px;
`;

const CardHeader = styled.div`
  width: 100%;
  z-index: 10;
  padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size8}`};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default StudySetFlashcard;
