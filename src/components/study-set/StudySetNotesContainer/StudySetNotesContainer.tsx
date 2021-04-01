import React from "react";
import { StudySetLinkedFlashcard } from "..";
import NoteTaker from "../../notetaking/NoteTaker";
import { VFlex } from "../../common";

interface StudySetNotesContainerProps {
  flashcardSize: number;
  flashcardPosition: number;
  notesRef?: (node: any) => void;
}

const StudySetNotesContainer: React.FC<StudySetNotesContainerProps> = ({
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
        <StudySetLinkedFlashcard
          flashcardSize={flashcardSize}
          flashcardPosition={flashcardPosition}
        />
      ) : null}
    </div>
  );
};

export default StudySetNotesContainer;
