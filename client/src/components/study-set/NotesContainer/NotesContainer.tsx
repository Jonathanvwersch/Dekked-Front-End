import React from "react";
import { LinkedFlashcard } from "..";
import { VFlex } from "../../common";

interface NotesContainerProps {
  flashcardSize: number;
}

const NotesContainer: React.FC<NotesContainerProps> = ({ flashcardSize }) => {
  return (
    <>
      <VFlex></VFlex>
      {flashcardSize ? <LinkedFlashcard flashcardSize={flashcardSize} /> : null}
    </>
  );
};

export default NotesContainer;
