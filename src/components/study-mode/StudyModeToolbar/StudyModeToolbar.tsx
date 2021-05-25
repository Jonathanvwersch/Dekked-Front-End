import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";
import { DeleteForeverIcon, EditIcon } from "../../../assets";
import { useFlashcards } from "../../../services/file-structure";
import { Params, SIZES } from "../../../shared";
import { IconActive, Spacer, Tooltip, Flex } from "../../common";
import { DeleteModal } from "../../shared";

interface StudyModeToolbarProps {
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  flashcardId?: string;
  isEditable: boolean;
}

const StudyModeToolbar: React.FC<StudyModeToolbarProps> = ({
  setIsEditable,
  flashcardId,
  isEditable,
}) => {
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteFlashcard } = useFlashcards();
  const { id } = useParams<Params>();

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
          text={
            isEditable
              ? "tooltips.studyMode.cardNowEditable"
              : "tooltips.studyMode.editCard"
          }
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
          flashcardId && deleteFlashcard(flashcardId, id);
        }}
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
