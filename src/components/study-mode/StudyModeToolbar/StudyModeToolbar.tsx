import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { deleteFlashcard } from "../../../services/flashcards/flashcards-api";
import { Params, SIZES } from "../../../shared";
import { IconActive, Spacer, Tooltip, Flex } from "../../common";
import { DeleteModal } from "../../shared";
import FlashcardModal from "../../shared/FlashcardModal/FlashcardModal";

interface StudyModeToolbarProps {
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setFlashcards: React.Dispatch<React.SetStateAction<FlashcardInterface[]>>;
  isEditable: boolean;
  flashcardId?: string;
  frontBlocks?: string[];
  backBlocks?: string[];
  ownerId?: string;
  currentBlockKey?: string;
}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = ({
  setIsEditable,
  flashcardId,
  isEditable,
  frontBlocks,
  backBlocks,
  ownerId,
  currentBlockKey,
  setFlashcards,
}) => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { id: studyPackId } = useParams<Params>();

  const { mutate: deleteCard } = useMutation(
    `${studyPackId}-delete-flashcard`,
    deleteFlashcard
  );

  return (
    <>
      <StudyToolbar
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
            className={isEditable ? "active" : undefined}
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
          <IconActive dangerHover handleClick={() => setIsOpen(true)}>
            <DeleteForeverIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
      </StudyToolbar>
      <DeleteModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        bodyText="studyMode.deleteModal.deleteCard"
        handleMainButton={() => {
          setFlashcards((prevState) =>
            prevState.filter(
              (flashcard) => flashcard.flashcard.id !== flashcardId
            )
          );
          deleteCard({
            flashcard_id: flashcardId,
            study_pack_id: studyPackId,
          });
        }}
      />

      <FlashcardModal
        type="edit"
        frontBlocks={frontBlocks}
        backBlocks={backBlocks}
        blockLink={currentBlockKey}
        ownerId={ownerId}
        flashcardId={flashcardId}
        isOpen={isEditable}
        setIsOpen={setIsEditable}
      />
    </>
  );
};

const StudyToolbar = styled(Flex)`
  position: absolute;
  right: ${({ theme }) => theme.spacers.size48};
  top: 88px;
`;

export default StudyModeToolbar;
