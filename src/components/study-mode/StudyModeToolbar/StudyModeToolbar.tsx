import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { useKeyPress } from "../../../hooks";
import { deleteFlashcard } from "../../../api/flashcards/flashcardsApi";
import { Params, SIZES, STUDY_MODE_TYPES } from "../../../shared";
import { flashcardsAtom, srFlashcardsAtom } from "../../../store";
import { IconActive, Spacer, Tooltip, Flex } from "../../common";
import { DeleteModal } from "../../shared";
import FlashcardModal from "../../shared/FlashcardModal/FlashcardModal";
import { getSessionCookie } from "../../../helpers";
import { isEmpty } from "lodash";

interface StudyModeToolbarProps {
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  isEditable: boolean;
  flashcardId?: string;
  frontBlocks?: string[];
  backBlocks?: string[];
  currentBlockKey?: string;
  studyMode?: STUDY_MODE_TYPES;
}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = ({
  setIsEditable,
  flashcardId,
  isEditable,
  frontBlocks,
  backBlocks,
  currentBlockKey,
  studyMode,
}) => {
  const theme = useContext(ThemeContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { id: studySetId } = useParams<Params>();
  const [, setFlashcards] = useAtom(flashcardsAtom);
  const [, setSrFlashcards] = useAtom(srFlashcardsAtom);
  const queryClient = useQueryClient();
  const getFlashcardsKey =
    studyMode === STUDY_MODE_TYPES.FREE_STUDY
      ? `${studySetId}-get-flashcards`
      : `${studySetId}-get-sr-flashcards`;

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

  useKeyPress(["e", "E"], () => !isDeleteModalOpen && setIsEditable(true));
  useKeyPress(["d", "D"], () => !isEditable && setIsDeleteModalOpen(true));

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
          id="DeleteFlashcard"
          text="tooltips.studyMode.deleteCard"
          place="left"
        >
          <IconActive handleClick={() => setIsDeleteModalOpen(true)}>
            <DeleteForeverIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
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
