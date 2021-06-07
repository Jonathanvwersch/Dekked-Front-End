import React, { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { useKeyPress } from "../../../hooks";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const { id: studyPackId } = useParams<Params>();

  const { mutate: deleteCard } = useMutation(
    `${studyPackId}-delete-flashcard`,
    deleteFlashcard
  );

  useKeyPress(["e", "E"], () => !isDeleteModalOpen && setIsEditable(true));
  useKeyPress(["d", "D"], () => !isEditable && setIsDeleteModalOpen(true));

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
            backgroundColor={theme.colors.backgrounds.studyModeBackground}
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
          <IconActive
            backgroundColor={theme.colors.backgrounds.studyModeBackground}
            handleClick={() => setIsDeleteModalOpen(true)}
          >
            <DeleteForeverIcon size={SIZES.LARGE} />
          </IconActive>
        </Tooltip>
      </StudyToolbar>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        bodyText="studyMode.deleteModal.deleteCard"
        handleMainButton={() => {
          setFlashcards((prevState) =>
            prevState.filter(
              (flashcard) => flashcard.flashcard.id !== flashcardId
            )
          );
          deleteCard({
            flashcard_id: flashcardId,
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
