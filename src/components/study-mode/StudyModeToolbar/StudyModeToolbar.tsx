import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
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
  const { mutate: deleteCard } = useMutation(
    `${studySetId}-delete-flashcard`,
    deleteFlashcard
  );

  useKeyPress(["e", "E"], () => !isDeleteModalOpen && setIsEditable(true));
  useKeyPress(["d", "D"], () => !isEditable && setIsDeleteModalOpen(true));

  return (
    <>
      <StudyToolbar
        studyMode={studyMode}
        flexDirection="column"
        width="auto"
        height="100%"
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
      </StudyToolbar>
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

const StudyToolbar = styled(Flex)<{ studyMode?: STUDY_MODE_TYPES }>`
  position: absolute;
  right: ${({ theme }) => theme.spacers.size48};
  top: ${({ studyMode }) =>
    studyMode === STUDY_MODE_TYPES.FREE_STUDY ? "88px" : undefined};
`;

export default StudyModeToolbar;
