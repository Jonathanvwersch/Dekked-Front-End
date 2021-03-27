import React from "react";
import { LinkedFlashcard } from "..";
import NoteTaker from "../../notetaking/NoteTaker";
import { VFlex } from "../../common";

interface NotesContainerProps {
  flashcardSize: number;
  flashcardPosition: number;
  notesRef?: (node: any) => void;
}

const NotesContainer: React.FC<NotesContainerProps> = ({
  flashcardSize,
  flashcardPosition,
  notesRef,
}) => {
  return (
    <div ref={notesRef}>
      <VFlex height="auto">
        <NoteTaker />
      </VFlex>
      {flashcardSize ? (
        <LinkedFlashcard
          flashcardSize={flashcardSize}
          flashcardPosition={flashcardPosition}
        />
      ) : null}
    </div>
  );
};

export default NotesContainer;
