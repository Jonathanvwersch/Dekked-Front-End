import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Card,
  Flex,
  Spacer,
  Text,
  Button,
  IconActive,
  ShadowCard,
  Tooltip,
} from "../../common";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { StudySetToolbar } from "..";
import { BUTTON_THEME, SIZES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { EditorState } from "draft-js";
import FlashcardNoteTaker from "../../notetaking/FlashcardNoteTaker";
import { isEmpty } from "lodash";
import {
  convertBlocksToContent,
  getWordCount,
} from "../../notetaking/Editor/Editor.helpers";
import { DeleteModal, FlashcardModal } from "../../shared";
import { useMutation } from "react-query";
import {
  addFlashcard,
  deleteFlashcard,
  saveFlashcard,
} from "../../../services/flashcards/flashcards-api";

enum FLASHCARD_SIDE {
  FRONT = "front",
  BACK = "back",
}
interface StudySetFlashcardProps {
  flashcardId?: string;
  frontBlocks?: string[];
  backBlocks?: string[];
  linked?: boolean;
  index?: number;
  ownerId?: string;
  currentBlockKey?: string;
  studyPackId?: string;
  vertical?: boolean; // if true, flashcard text containers will be stacked vertically
  width?: string;
  toolbarSize?: SIZES;
  fullHeight?: boolean;
  type?: "edit" | "add";
  setFlashcards?: React.Dispatch<React.SetStateAction<FlashcardInterface[]>>;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  linked = false,
  index,
  flashcardId,
  studyPackId,
  ownerId,
  currentBlockKey,
  vertical = false,
  width,
  fullHeight = false,
  toolbarSize = SIZES.SMALL,
  type,
  setFlashcards,
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
  const [editFlashcard, setEditFlashcard] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const frontEditorRef = useRef<any>();
  const backEditorRef = useRef<any>();

  useEffect(() => {
    if (linked) {
      setIsEditable(true);
      // adding a near instantaneous delay to allow linked flashcard to appear on screen before focusing
      setTimeout(() => {
        frontEditorRef?.current?.focus();
      }, 50);
    }
  }, [linked, backEditorRef]);

  const { mutate: addCard } = useMutation(
    `${studyPackId}-add-flashcard`,
    addFlashcard
  );

  const { mutate: deleteCard } = useMutation(
    `${studyPackId}-delete-flashcard`,
    deleteFlashcard
  );

  const { mutate: saveCard, isLoading: isSaveLoading } = useMutation(
    `${studyPackId}-save-flashcard`,
    saveFlashcard
  );

  // Switch up current side depending on focus
  useEffect(() => {
    frontHasFocus && setCurrentSide(FLASHCARD_SIDE.FRONT);
    backHasFocus && setCurrentSide(FLASHCARD_SIDE.BACK);
  }, [frontHasFocus, backHasFocus]);

  // Set editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks?.[0]?.[0] === "{") {
      const savedState = convertBlocksToContent(frontBlocks);
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontBlocks]);

  // Set editor state on mount
  useEffect(() => {
    if (backBlocks && !isEmpty(backBlocks) && backBlocks?.[0]?.[0] === "{") {
      const savedState = convertBlocksToContent(backBlocks);
      setBackFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [backBlocks, frontBlocks]);

  const frontAndBack = (side: string) => {
    return (
      <TextCardContainer
        vertical={vertical}
        padding="0px"
        backgroundColor={theme.colors.backgrounds.pageBackground}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
        height={fullHeight ? "100%" : "auto"}
      >
        <CardHeader>
          <Text fontColor={theme.colors.grey1}>
            {side === FLASHCARD_SIDE.FRONT
              ? formatMessage("studySet.flashcards.front")
              : formatMessage("studySet.flashcards.back")}
          </Text>
        </CardHeader>
        <TextCard
          fullHeight={fullHeight}
          linked={linked}
          backgroundColor={theme.colors.backgrounds.pageBackground}
        >
          <FlashcardNoteTaker
            isEditable={isEditable}
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
            editorRef={
              side === FLASHCARD_SIDE.FRONT ? frontEditorRef : backEditorRef
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

  const topbar = () => {
    return linked ? (
      <Flex justifyContent="center" minHeight={theme.spacers.size24}>
        <StudySetToolbar
          iconSize={toolbarSize}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </Flex>
    ) : (
      <Flex justifyContent="space-between" minHeight={theme.spacers.size24}>
        <Text userSelect="none">{index}</Text>
        <Flex width="auto">
          <Tooltip
            id="EditFlashcard"
            text={"tooltips.studyMode.editCard"}
            place="bottom"
          >
            <IconActive handleClick={() => setEditFlashcard(true)}>
              <EditIcon />
            </IconActive>
          </Tooltip>
          <Spacer width={theme.spacers.size8} />

          <Tooltip
            id="DeleteFlashcard"
            text="tooltips.studyMode.deleteCard"
            place="bottom"
          >
            <IconActive
              dangerHover
              handleClick={() => setIsDeleteModalOpen(true)}
            >
              <DeleteForeverIcon />
            </IconActive>
          </Tooltip>
        </Flex>
      </Flex>
    );
  };

  const handleSaveFlashcard = () => {
    if (type === "add") {
      ownerId &&
        studyPackId &&
        addCard({
          owner_id: ownerId,
          study_pack_id: studyPackId,
          block_link: currentBlockKey,
          frontFlashcardEditorState,
          backFlashcardEditorState,
        });
      setFrontFlashcardEditorState(EditorState.createEmpty());
      setBackFlashcardEditorState(EditorState.createEmpty());
      setTimeout(() => {
        frontEditorRef?.current?.focus();
      }, 50);
    } else {
      saveCard({
        frontEditorState: frontFlashcardEditorState,
        backEditorState: backFlashcardEditorState,
        flash_card_id: flashcardId,
        owner_id: ownerId,
      });
    }
  };

  const studySetFlashcard = document.getElementById(
    `StudySetFlashcard-${index}`
  );

  studySetFlashcard?.addEventListener("dblclick", function (e) {
    type !== "add" && type !== "edit" && setEditFlashcard(true);
  });

  studySetFlashcard?.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && type !== "add" && type !== "edit")
      setEditFlashcard(true);
  });

  console.log(editFlashcard);

  return (
    <>
      <StyledShadowCard
        id={`StudySetFlashcard-${index}`}
        backgroundColor={theme.colors.secondary}
        padding={theme.spacers.size16}
        borderRadius={theme.sizes.borderRadius[SIZES.MEDIUM]}
        zIndex="15"
        width={width || "99%"}
        height={fullHeight ? "100%" : "auto"}
        tabIndex={0}
        ariaLabel={formatMessage("ariaLabels.studySetFlashcard")}
        role="button"
        type={type}
      >
        <Flex flexDirection="column" height={fullHeight ? "100%" : "auto"}>
          {topbar()}
          <Spacer height={theme.spacers.size8} />
          <Flex
            justifyContent="space-between"
            alignItems="stretch"
            flexDirection={vertical ? "column" : "row"}
            height={fullHeight ? "100%" : "auto"}
            overflow="hidden"
          >
            {frontAndBack(FLASHCARD_SIDE.FRONT)}
            {frontAndBack("back")}
          </Flex>
          {linked ? (
            <Flex justifyContent="flex-end" mt={theme.spacers.size8}>
              <Button
                buttonStyle={BUTTON_THEME.PRIMARY}
                isDisabled={
                  getWordCount(frontFlashcardEditorState) === 0 &&
                  getWordCount(backFlashcardEditorState) === 0
                }
                handleClick={handleSaveFlashcard}
                isLoading={type === "edit" ? isSaveLoading : false}
              >
                {formatMessage(
                  type === "edit" ? "generics.save" : "generics.add"
                )}
              </Button>
            </Flex>
          ) : null}
        </Flex>
      </StyledShadowCard>
      <DeleteModal
        handleMainButton={() => {
          setFlashcards &&
            setFlashcards((prevState) =>
              prevState.filter(
                (flashcard) => flashcard.flashcard.id !== flashcardId
              )
            );
          deleteCard({
            flashcard_id: flashcardId,
          });
        }}
        bodyText="studyMode.deleteModal.deleteCard"
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
      />
      <FlashcardModal
        isOpen={editFlashcard}
        setIsOpen={setEditFlashcard}
        ownerId={ownerId}
        frontBlocks={frontBlocks}
        backBlocks={backBlocks}
        type="edit"
        flashcardId={flashcardId}
      />
    </>
  );
};

const StyledShadowCard = styled(ShadowCard)<{ type?: "edit" | "add" }>`
  &:focus {
    border: ${({ theme, type }) =>
      type !== "edit" && type !== "add" && `1px solid ${theme.colors.primary}`};
  }
`;

const TextCardContainer = styled(Card)<{ vertical?: boolean }>`
  max-width: ${({ vertical }) => (vertical ? "100%" : "49%")};
  width: ${({ vertical }) => (vertical ? "100%" : "49%")};
  max-height: ${({ vertical }) => (vertical ? "48%" : "auto")};
  position: relative;
`;

const TextCard = styled(Card)<{ linked: boolean; fullHeight?: boolean }>`
  overflow: hidden;
  &:hover {
    overflow: auto;
  }
  padding: ${({ theme }) =>
    `${theme.spacers.size24} ${theme.spacers.size24} ${theme.spacers.size16} ${theme.spacers.size24}`};
  max-height: ${({ fullHeight, linked }) =>
    fullHeight ? "100%" : linked ? "200px" : "100px"};
`;

const CardHeader = styled.div`
  user-select: none;
  width: 95%;
  z-index: 10;
  padding: ${({ theme }) => `${theme.spacers.size4} ${theme.spacers.size8}`};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.backgrounds.pageBackground};
`;

export default StudySetFlashcard;
