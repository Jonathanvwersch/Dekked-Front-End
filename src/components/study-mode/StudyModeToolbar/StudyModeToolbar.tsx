import { useAtom } from "jotai";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { ThemeContext } from "styled-components";
import {
  DeleteForeverIcon,
  EditIcon,
  FullscreenIcon,
  IconActive,
  Spacer,
  Flex,
  FilledStarIcon,
  EmptyStarIcon,
  StudyModeIcon,
} from "dekked-design-system";
import { useKeyPress } from "../../../hooks";
import { deleteFlashcard, saveFlashcard } from "../../../api";
import { Params, SIZES, STUDY_MODE_TYPES } from "../../../shared";
import {
  flashcardsAtom,
  fullscreenStudyModeAtom,
  srFlashcardsAtom,
} from "../../../store";
import { DeleteModal } from "../../shared";
import FlashcardModal from "../../shared/FlashcardModal/FlashcardModal";
import { isEmpty } from "lodash";
import { Tooltip } from "../../common";
import { queryClient } from "../../..";
import { updateFlashcards } from "../../study-set/StudySetFlashcard/StudySetFlashcard";
import { EditorState } from "draft-js";

interface StudyModeToolbarProps {
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedLastFlashcard: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
  flashcardId?: string;
  frontBlocks?: string[];
  backBlocks?: string[];
  currentBlockKey?: string;
  studyMode?: STUDY_MODE_TYPES;
  starred?: boolean;
  frontFlashcardEditorState: EditorState;
  backFlashcardEditorState: EditorState;
}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = ({
  setIsEditable,
  flashcardId,
  isEditable,
  frontBlocks,
  backBlocks,
  currentBlockKey,
  setDeletedLastFlashcard,
  studyMode,
  starred,
  frontFlashcardEditorState,
  backFlashcardEditorState,
}) => {
  const theme = useContext(ThemeContext);
  const [fullscreen, setFullscreen] = useAtom(fullscreenStudyModeAtom);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [starFlashcard, setStarFlashcard] = useState<boolean>(Boolean(starred));
  const { id: fileId, type } = useParams<Params>();
  const [, setFlashcards] = useAtom(flashcardsAtom);
  const [, setSrFlashcards] = useAtom(srFlashcardsAtom);
  const fullscreenRef = useRef<HTMLButtonElement>(null);
  const getFlashcardsKey =
    studyMode === STUDY_MODE_TYPES.FREE_STUDY
      ? `${fileId}-get-flashcards`
      : `${fileId}-get-sr-flashcards`;
  const history = useHistory();
  const route = useRouteMatch();
  console.log(route);

  const { mutate: deleteCard } = useMutation(
    `${fileId}-delete-flashcard`,
    deleteFlashcard,
    {
      onSuccess: async (_, { flashcard_id }) => {
        let flashcards;
        queryClient.setQueryData(getFlashcardsKey, (prevState: any) => {
          flashcards = prevState?.filter(
            (flashcard: FlashcardInterface) => flashcard.id !== flashcard_id
          );
          return flashcards;
        });

        isEmpty(flashcards) &&
          queryClient.refetchQueries("get-all-due-sr-decks");

        isEmpty(flashcards) && setDeletedLastFlashcard(true);
      },
    }
  );

  const { mutate: saveCard } = useMutation("save-flashcard", saveFlashcard, {
    onSuccess: (data, { flashcard_id }) => {
      queryClient.setQueryData(getFlashcardsKey, (prevState: any) =>
        updateFlashcards(prevState, data, flashcard_id)
      );
    },
  });

  useKeyPress(["e", "E"], () => !isDeleteModalOpen && setIsEditable(true));
  useKeyPress(["d", "D"], () => !isEditable && setIsDeleteModalOpen(true));

  useKeyPress(
    ["f", "F"],
    () =>
      !isEditable &&
      !isDeleteModalOpen &&
      setFullscreen((prevState) => !prevState)
  );

  useEffect(() => {
    setStarFlashcard(Boolean(starred));
  }, [starred]);

  return (
    <>
      <Flex
        flexDirection="column"
        width="auto"
        height="100%"
        ml={theme.spacers.size16}
        justifyContent="flex-start"
      >
        <Tooltip
          id="FavouriteFlashcard"
          text={
            starFlashcard
              ? "tooltips.studyMode.unstarCard"
              : "tooltips.studyMode.starCard"
          }
          place="bottom"
        >
          <IconActive
            handleClick={() => {
              setStarFlashcard((prevState) => !prevState);
              saveCard({
                flashcard_id: flashcardId,
                starred: !starFlashcard,
                study_set_id: fileId,
                frontEditorState: frontFlashcardEditorState,
                backEditorState: backFlashcardEditorState,
              });
            }}
          >
            {starFlashcard ? (
              <FilledStarIcon color={theme.colors.primary} />
            ) : (
              <EmptyStarIcon />
            )}
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
        <Tooltip
          id="EditFlashcard"
          text={"tooltips.studyMode.editCard"}
          place="left"
        >
          <IconActive
            handleClick={() => setIsEditable((prevState) => !prevState)}
          >
            <EditIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
        <Tooltip
          id="FullScreenFlashcard"
          text={
            fullscreen
              ? "tooltips.studyMode.exitFullscreen"
              : "tooltips.studyMode.enterFullscreen"
          }
          place="left"
        >
          <IconActive
            handleClick={() => setFullscreen((prevState) => !prevState)}
            className={fullscreen ? "active" : undefined}
            iconActiveRef={fullscreenRef}
          >
            <FullscreenIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
        <Tooltip
          id="SwitchStudyModes"
          text={
            studyMode === STUDY_MODE_TYPES.FREE_STUDY
              ? "tooltips.studyMode.switchToSpacedRepetition"
              : "tooltips.studyMode.switchToFreeStudy"
          }
          place="left"
        >
          <IconActive
            handleClick={() =>
              history.push(
                `${
                  studyMode === STUDY_MODE_TYPES.FREE_STUDY
                    ? STUDY_MODE_TYPES.SPACED_REPETITION
                    : STUDY_MODE_TYPES.FREE_STUDY
                }`
              )
            }
          >
            <StudyModeIcon />
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
        <Tooltip
          id="DeleteFlashcard"
          text="tooltips.studyMode.deleteCard"
          place="left"
        >
          <IconActive handleClick={() => setIsDeleteModalOpen(true)}>
            <DeleteForeverIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
        <Spacer height={theme.spacers.size16} />
      </Flex>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        bodyText="studyMode.deleteModal.deleteCard"
        handleMainButton={() => {
          studyMode === STUDY_MODE_TYPES.FREE_STUDY
            ? setFlashcards((prevState) =>
                prevState?.filter((flashcard) => flashcard.id !== flashcardId)
              )
            : setSrFlashcards((prevState) =>
                prevState?.filter((flashcard) => flashcard.id !== flashcardId)
              );
          deleteCard({
            flashcard_id: flashcardId,
          });
        }}
      />
      <FlashcardModal
        type="edit"
        studyMode={studyMode}
        frontBlocks={frontBlocks}
        backBlocks={backBlocks}
        blockLink={currentBlockKey}
        flashcardId={flashcardId}
        isOpen={isEditable}
        setIsOpen={setIsEditable}
      />
    </>
  );
};

export default StudyModeToolbar;
