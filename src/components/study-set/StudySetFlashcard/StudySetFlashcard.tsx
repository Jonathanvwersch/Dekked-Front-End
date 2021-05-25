import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Card,
  Flex,
  Spacer,
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
import { EditorState } from "draft-js";
import FlashcardNoteTaker from "../../notetaking/FlashcardNoteTaker";
import { useFlashcards } from "../../../services/file-structure";
import { debounce, isEmpty } from "lodash";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
  getWordCount,
} from "../../notetaking/Editor/Editor.helpers";
import { DeleteModal } from "../../shared";

enum FLASHCARD_SIDE {
  FRONT = "front",
  BACK = "back",
}
interface StudySetFlashcardProps {
  deleteFlashcard?: () => void;
  flashcardId?: string;
  frontBlocks?: string[];
  backBlocks?: string[];
  linked?: boolean;
  index?: number;
  ownerId?: string;
  currentBlockKey?: string;
  studyPackId?: string;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  linked = false,
  index,
  deleteFlashcard,
  flashcardId,
  studyPackId,
  ownerId,
  currentBlockKey,
}) => {
  const [frontHasFocus, setFrontHasFocus] = useState<boolean>(false);
  const [backHasFocus, setBackHasFocus] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { theme, formatMessage } = usePageSetupHelpers();
  const [frontFlashcardEditorState, setFrontFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [backFlashcardEditorState, setBackFlashcardEditorState] =
    useState<EditorState>(EditorState.createEmpty());
  const [currentSide, setCurrentSide] = useState<FLASHCARD_SIDE>();
  const [saving, setSaving] = useState<boolean>(false);
  const { addFlashcard, saveFlashcard } = useFlashcards();

  // Make call to server to save text blocks
  const onSave = async (
    frontEditorState: EditorState,
    backEditorState: EditorState,
    flashcardId: string | undefined,
    ownerId: string | undefined
  ) => {
    setSaving(true);
    const { keys: frontKeys, blocks: frontBlocks } =
      createKeysAndBlocks(frontEditorState);
    const { keys: backKeys, blocks: backBlocks } =
      createKeysAndBlocks(backEditorState);
    const response = await saveFlashcard({
      front_blocks: frontBlocks,
      front_draft_keys: frontKeys,
      back_blocks: backBlocks,
      back_draft_keys: backKeys,
      flash_card_id: flashcardId,
      owner_id: ownerId,
    });
    if (response.success) {
      setSaving(!response.success);
    }
  };

  // Debounce function to autosave notes
  const debounced = debounce(
    (
      editorState: EditorState,
      flashcardId: string | undefined,
      ownerId: string | undefined
    ) => {
      if (currentSide === FLASHCARD_SIDE.FRONT) {
        onSave(editorState, backFlashcardEditorState, flashcardId, ownerId);
      } else {
        onSave(frontFlashcardEditorState, editorState, flashcardId, ownerId);
      }
    },
    1000
  );

  const autoSave = useCallback(
    (editorState: EditorState) => {
      !linked && debounced(editorState, flashcardId, ownerId);
    },
    [currentSide, flashcardId, ownerId]
  );

  useEffect(() => {
    frontHasFocus && setCurrentSide(FLASHCARD_SIDE.FRONT);
    backHasFocus && setCurrentSide(FLASHCARD_SIDE.BACK);
  }, [frontHasFocus, backHasFocus]);

  // Set editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks[0][0] === "{") {
      const savedState = convertBlocksToContent(frontBlocks);
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontBlocks]);

  // Set editor state on mount
  useEffect(() => {
    if (backBlocks && !isEmpty(backBlocks) && backBlocks[0][0] === "{") {
      const savedState = convertBlocksToContent(backBlocks);
      setBackFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [backBlocks, frontBlocks]);

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === FLASHCARD_SIDE.FRONT
              ? formatMessage("studySet.flashcards.front")
              : formatMessage("studySet.flashcards.back")}
          </Text>
        </CardHeader>
        <Spacer height={theme.spacers.size8} />
        <TextCard
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          <FlashcardNoteTaker
            autoSave={autoSave}
            hasFocus={
              side === FLASHCARD_SIDE.FRONT ? frontHasFocus : backHasFocus
            }
            setHasFocus={
              side === FLASHCARD_SIDE.FRONT ? setFrontHasFocus : setBackHasFocus
            }
            editorState={
              side === FLASHCARD_SIDE.FRONT
                ? frontFlashcardEditorState
                : backFlashcardEditorState
            }
            setEditorState={
              side === FLASHCARD_SIDE.FRONT
                ? setFrontFlashcardEditorState
                : setBackFlashcardEditorState
            }
          />
        </TextCard>
      </TextCardContainer>
    );
  };

  const editorState =
    currentSide === FLASHCARD_SIDE.FRONT
      ? frontFlashcardEditorState
      : backFlashcardEditorState;

  const setEditorState =
    currentSide === FLASHCARD_SIDE.FRONT
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
      <Flex justifyContent="center" minHeight={theme.spacers.size24}>
        {toolbar}
      </Flex>
    ) : (
      <Flex justifyContent="space-between" minHeight={theme.spacers.size24}>
        <Text>{index}</Text>
        {toolbar}
        {saving ? (
          <IconWrapper>
            <ComponentLoadingSpinner size={SIZES.SMALL} />
          </IconWrapper>
        ) : (
          <IconActive
            dangerHover
            handleClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteIcon />
          </IconActive>
        )}
      </Flex>
    );
  };

  const handleSaveLinkedFlashcard = () => {
    const { keys: frontKeys, blocks: frontBlocks } = createKeysAndBlocks(
      frontFlashcardEditorState
    );
    const { keys: backKeys, blocks: backBlocks } = createKeysAndBlocks(
      backFlashcardEditorState
    );
    ownerId &&
      studyPackId &&
      currentBlockKey &&
      addFlashcard(
        ownerId,
        studyPackId,
        currentBlockKey,
        frontBlocks,
        frontKeys,
        backBlocks,
        backKeys
      );
    setFrontFlashcardEditorState(EditorState.createEmpty());
    setBackFlashcardEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <ShadowCard
        backgroundColor={theme.colors.secondary}
        padding={theme.spacers.size16}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
        zIndex="15"
        width="99%"
      >
        <Flex flexDirection="column">
          {topbar()}
          <Spacer height={theme.spacers.size8} />
          <Flex justifyContent="space-between" alignItems="stretch">
            {frontAndBack(FLASHCARD_SIDE.FRONT)}
            {frontAndBack("back")}
          </Flex>
          <Spacer height={theme.spacers.size8} />
          {linked ? (
            <Flex justifyContent="flex-end">
              <Button
                buttonStyle={BUTTON_THEME.PRIMARY}
                disabled={
                  getWordCount(frontFlashcardEditorState) === 0 &&
                  getWordCount(backFlashcardEditorState) === 0
                }
                handleClick={handleSaveLinkedFlashcard}
              >
                {formatMessage("generics.save")}
              </Button>
            </Flex>
          ) : null}
        </Flex>
      </ShadowCard>
      <DeleteModal
        handleMainButton={() => deleteFlashcard && deleteFlashcard()}
        bodyText="studyMode.deleteModal.deleteCard"
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      />
    </>
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
