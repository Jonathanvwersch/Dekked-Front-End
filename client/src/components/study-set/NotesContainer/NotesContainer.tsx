import React from "react";
import { LinkedFlashcard } from "..";
import NoteTaker from "../../../pages/StudySetPage/NoteTaking/NoteTaker";
import { VFlex } from "../../common";

interface NotesContainerProps {
  flashcardSize: number;
}

const NotesContainer: React.FC<NotesContainerProps> = ({ flashcardSize }) => {
  return (
    <>
      <VFlex height="auto">
        <NoteTaker />
      </VFlex>
      {flashcardSize ? <LinkedFlashcard flashcardSize={flashcardSize} /> : null}
    </>
  );
};

export default NotesContainer;
