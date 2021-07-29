import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import { BUTTON_THEME, Params, SIZES, STUDY_MODE_TYPES } from "../../../shared";
import { usePageSetupHelpers } from "../../../hooks";
import { EditorState } from "draft-js";
import FlashcardNoteTaker from "../../notetaking/FlashcardNoteTaker";
import { isEmpty, isEqual } from "lodash";
import {
  convertBlocksToContent,
  createKeysAndBlocks,
  getWordCount,
} from "../../notetaking/Editor/Editor.helpers";
import { DeleteModal, FlashcardModal } from "../../shared";
import { useMutation, useQueryClient } from "react-query";
import {
  addFlashcard,
  deleteFlashcard,
  saveFlashcard,
} from "../../../api/flashcards/flashcardsApi";
import {
  deckAtom,
  isMainFlashcardButtonDisabledAtom,
  userAtom,
} from "../../../store";
import { useAtom } from "jotai";
import { useParams } from "react-router-dom";
import { getSessionCookie } from "../../../helpers";

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
  currentBlockKey?: string;
  vertical?: boolean; // if true, flashcard text containers will be stacked vertically
  width?: string;
  toolbarSize?: SIZES;
  fullHeight?: boolean;
  studyMode?: STUDY_MODE_TYPES;
  type?: "edit" | "add";
  setFlashcards?: (
    update?: SetStateAction<FlashcardInterface[] | undefined>
  ) => void;
  closeModal?: () => void;
}

const StudySetFlashcard: React.FC<StudySetFlashcardProps> = ({
  frontBlocks,
  backBlocks,
  linked = false,
  index,
  studyMode = STUDY_MODE_TYPES.FREE_STUDY,
  flashcardId,
  currentBlockKey,
  vertical = false,
  width,
  fullHeight = false,
  toolbarSize = SIZES.SMALL,
  type,
  setFlashcards,
  closeModal,
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
  const [user] = useAtom(userAtom);
  const { id: ownerId } = user;
  const { id: studySetId } = useParams<Params>();
  const [deck] = useAtom(deckAtom);
  const frontEditorRef = useRef<any>();
  const backEditorRef = useRef<any>();
  const queryClient = useQueryClient();
  const [isMainFlashcardButtonDisabled, setIsMainFlashcardButtonDisabled] =
    useAtom(isMainFlashcardButtonDisabledAtom);

  const getFlashcardsKey =
    studyMode === STUDY_MODE_TYPES.FREE_STUDY
      ? `${studySetId}-get-flashcards`
      : `${studySetId}-get-sr-flashcards`;

  useEffect(() => {
    if (linked) {
      setIsEditable(true);
      frontEditorRef?.current?.focus();
    }
  }, [linked, frontEditorRef]);

  const { mutate: addCard } = useMutation(
    `${studySetId}-add-flashcard`,
    addFlashcard,
    {
      onSuccess: async (data: { fullFlashcard: FlashcardInterface }) => {
        queryClient.setQueryData(getFlashcardsKey, (prevState: any) => {
          const allFlashcards = prevState || [];
          allFlashcards?.push(data?.fullFlashcard);
          return allFlashcards;
        });
        queryClient.refetchQueries(
          `${getSessionCookie()}-get-all-due-sr-decks`
        );
      },
    }
  );

  const { mutate: deleteCard } = useMutation(
    `${studySetId}-delete-flashcard`,
    deleteFlashcard,
    {
      onSuccess: async (data, { flashcard_id }) => {
        let flashcards;
        queryClient.setQueryData(getFlashcardsKey, (prevState: any) => {
          flashcards = prevState?.filter(
            (flashcard: FlashcardInterface) => flashcard.id !== flashcard_id
          );
          return flashcards;
        });

        isEmpty(flashcards) &&
          queryClient.refetchQueries(
            `${getSessionCookie()}-get-all-due-sr-decks`
          );
      },
    }
  );

  const updateFlashcards = (
    flashcards: FlashcardInterface[] | undefined,
    updatedFlashcard: FlashcardInterface,
    flashcardId?: string
  ) => {
    if (flashcards && flashcardId) {
      const flashcardIndex = flashcards.findIndex(
        (card) => card?.id === flashcardId
      );
      flashcards[flashcardIndex] = updatedFlashcard;
    }
    return flashcards || [];
  };

  const {
    mutate: saveCard,
    isLoading: isSaveLoading,
    isSuccess: isSaveSuccess,
  } = useMutation("save-flashcard", saveFlashcard, {
    onSuccess: (data, { flashcard_id }) => {
      queryClient.setQueryData(getFlashcardsKey, (prevState: any) =>
        updateFlashcards(prevState, data?.fullFlashcard, flashcard_id)
      );
    },
  });

  useEffect(() => {
    if (isSaveSuccess && !isSaveLoading) {
      closeModal && closeModal();
    }
  }, [isSaveSuccess, closeModal, isSaveLoading]);

  // Switch up current side depending on focus
  useLayoutEffect(() => {
    if (frontHasFocus) {
      setCurrentSide(FLASHCARD_SIDE.FRONT);
      frontEditorRef?.current?.focus();
    } else if (backHasFocus) {
      setCurrentSide(FLASHCARD_SIDE.BACK);
      backEditorRef?.current?.focus();
    }
  }, [frontHasFocus, backHasFocus]);

  // Set front editor state on mount
  useEffect(() => {
    if (frontBlocks && !isEmpty(frontBlocks) && frontBlocks?.[0]?.[0] === "{") {
      const savedState = convertBlocksToContent(frontBlocks);
      setFrontFlashcardEditorState(EditorState.createWithContent(savedState));
    }
  }, [frontBlocks]);

  // Set back editor state on mount
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
              side === FLASHCARD_SIDE.FRONT
                ? frontEditorRef
                : side === FLASHCARD_SIDE.BACK
                ? backEditorRef
                : undefined
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

  const handleSubmitFlashcard = () => {
    if (type === "add") {
      studySetId &&
        addCard({
          owner_id: ownerId,
          deck_id: deck?.id,
          study_set_id: studySetId,
          block_link: currentBlockKey,
          frontFlashcardEditorState,
          backFlashcardEditorState,
        });
      setFrontFlashcardEditorState(EditorState.createEmpty());
      setBackFlashcardEditorState(EditorState.createEmpty());
      setTimeout(() => {
        frontEditorRef?.current?.focus();
      }, 1);
    } else {
      flashcardId &&
        saveCard({
          frontEditorState: frontFlashcardEditorState,
          backEditorState: backFlashcardEditorState,
          flashcard_id: flashcardId,
          deck_id: deck?.id,
          owner_id: ownerId,
        });
    }
  };

  const studySetFlashcard = document.getElementById(
    `StudySetFlashcard-${index}`
  );

  studySetFlashcard?.addEventListener(
    "dblclick",
    () => type !== "add" && type !== "edit" && setEditFlashcard(true)
  );

  studySetFlashcard?.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && type !== "add" && type !== "edit")
      setEditFlashcard(true);
  });

  const { blocks: _backBlocks } = createKeysAndBlocks(backFlashcardEditorState);
  const { blocks: _frontBlocks } = createKeysAndBlocks(
    frontFlashcardEditorState
  );

  const isSaveButtonDisabled = useCallback(
    () =>
      isEqual(_backBlocks, backBlocks) && isEqual(_frontBlocks, frontBlocks),
    [_backBlocks, _frontBlocks] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const isAddButtonDisabled = useCallback(
    () =>
      getWordCount(frontFlashcardEditorState) === 0 &&
      getWordCount(backFlashcardEditorState) === 0,
    [frontFlashcardEditorState, backFlashcardEditorState]
  );

  useEffect(() => {
    if (
      type === "edit" &&
      isMainFlashcardButtonDisabled !== isSaveButtonDisabled()
    ) {
      setIsMainFlashcardButtonDisabled(isSaveButtonDisabled());
    } else if (
      type === "add" &&
      isMainFlashcardButtonDisabled !== isAddButtonDisabled()
    ) {
      setIsMainFlashcardButtonDisabled(isAddButtonDisabled());
    }
  }, [
    isAddButtonDisabled,
    setIsMainFlashcardButtonDisabled,
    type,
    isSaveButtonDisabled,
    isMainFlashcardButtonDisabled,
  ]);

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
            {frontAndBack(FLASHCARD_SIDE.BACK)}
          </Flex>
          {linked ? (
            <Flex justifyContent="flex-end" mt={theme.spacers.size8}>
              <Button
                buttonStyle={BUTTON_THEME.PRIMARY}
                isDisabled={
                  type === "edit"
                    ? isSaveButtonDisabled()
                    : isAddButtonDisabled()
                }
                handleClick={handleSubmitFlashcard}
                isLoading={type === "edit" ? isSaveLoading : false}
              >
                {formatMessage(
                  type === "edit" ? "generics.saveAndClose" : "generics.add"
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
              prevState?.filter((flashcard) => flashcard.id !== flashcardId)
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

export default React.memo(StudySetFlashcard, (prevProps, newProps) => {
  return isEqual(newProps, prevProps);
});
